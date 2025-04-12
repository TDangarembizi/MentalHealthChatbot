from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore
import requests
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables
load_dotenv()

# Firebase config
firebase_config = {
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
}

# Initialise Flask app
app = Flask(__name__)
CORS(app)

# Initialise Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate(firebase_config)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

# Rasa server URL
RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route("/")
def index():
    return {"message": "Flask backend is running!"}

#Protected Firebase auth route
@app.route("/secure-endpoint", methods=["POST"])
def secure_endpoint():
    token = request.headers.get("Authorization", "").split("Bearer ")[-1]

    try:
        decoded_token = auth.verify_id_token(token)
        user_email = decoded_token.get("email")
        username = decoded_token.get("name") or decoded_token.get("displayName")

        return jsonify({
            "message": f"Authenticated as {username or user_email}"
        })

    except Exception as e:
        return jsonify({"error": "Unauthorized", "details": str(e)}), 401

#Chatbot interaction endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    sender_id = data.get("sender", "anonymous")  # Optional

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        rasa_response = requests.post(RASA_URL, json={
            "sender": sender_id,
            "message": user_message
        })
        rasa_response.raise_for_status()
        return jsonify(rasa_response.json())

    except requests.RequestException as e:
        return jsonify({"error": "Failed to contact Rasa server", "details": str(e)}), 500

@app.route("/journal", methods=["POST"])
def create_journal():
    data = request.get_json()
    db.collection("journals").add(data)
    return jsonify({"message": "Journal entry saved"}), 201

@app.route("/journal", methods=["GET"])
def get_journals():
    entries = db.collection("journals").stream()
    results = [{**entry.to_dict(), "id": entry.id} for entry in entries]
    return jsonify(results), 200

@app.route("/mood", methods=["POST"])
def submit_mood():
    data = request.get_json()
    user_id = data.get("user_id", "anonymous").replace('.', '_')

    mood_entry = {
        "mood": data.get("mood"),
        "timestamp": data.get("timestamp")
    }

    try:
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)
        user_doc.collection("mood").add(mood_entry)

        return jsonify({"message": "Mood saved"}), 201

    except Exception as e:
        print("Mood save error:", str(e))
        return jsonify({"error": "Failed to save mood", "details": str(e)}), 500

@app.route("/assessment", methods=["POST"])
def submit_assessment():
    data = request.get_json()
    user_id = data.get("user_id", "anonymous").replace('.', '_')

    phq9_score = data.get("score", {}).get("phq9", 0)
    gad7_score = data.get("score", {}).get("gad7", 0)

    assessment_data = {
        "phq9": phq9_score,
        "gad7": gad7_score,
        "responses": data.get("responses", {}),
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        print(f"[DEBUG] Submitting to users/{user_id}/assessments")

        # Ensure user doc exists
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)

        # Add to assessments subcollection
        user_doc.collection("assessments").add(assessment_data)

        return jsonify({"message": "Assessment submitted"}), 201

    except Exception as e:
        print("Firestore error:", str(e))
        return jsonify({"error": "Failed to submit assessment", "details": str(e)}), 500


@app.route("/assessment/results", methods=["GET"])
def get_assessments():
    user_id = request.args.get("user_id", "anonymous").replace('.', '_')

    try:
        user_ref = db.collection("users").document(user_id)
        assessments = user_ref.collection("assessments").order_by("timestamp").stream()
        results = [{**doc.to_dict(), "id": doc.id} for doc in assessments]
        return jsonify(results), 200

    except Exception as e:
        print("Error fetching assessments:", str(e))
        return jsonify({"error": "Failed to retrieve assessments", "details": str(e)}), 500

@app.route("/journal", methods=["POST"])
def submit_journal():
    data = request.get_json()
    user_id = data.get("user_id", "anonymous").replace('.', '_')

    entry = {
        "text": data.get("text"),
        "timestamp": data.get("timestamp")
    }

    try:
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)
        user_doc.collection("journal").add(entry)
        return jsonify({"message": "Journal entry saved"}), 201

    except Exception as e:
        return jsonify({"error": "Failed to save entry", "details": str(e)}), 500


@app.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.get_json()
    db.collection("feedback").add(data)
    return jsonify({"message": "Feedback received"}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
