from flask_cors import CORS
import bcrypt
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import firestore
import requests
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from datetime import datetime
from functools import wraps
from firebase_admin import auth
import bcrypt

# Replace with the UID of the admin user
auth.set_custom_user_claims("Kl2v9O4ilfQc5FBdlEoj5kiza9s1", {"admin": True})

def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization", "").split("Bearer ")[-1]
        try:
            decoded_token = auth.verify_id_token(token)
            request.uid = decoded_token["uid"]
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Unauthorized", "details": str(e)}), 401
    return decorated_function

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
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

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

@app.route("/save-preferences", methods=["POST"])
def save_preferences():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    preferences = data.get("preferences", {})

    try:
        db.collection("users").document(user_id).set(
            {"preferences": preferences}, merge=True
        )
        return jsonify({"message": "Preferences saved to Firebase"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get-preferences", methods=["GET"])
def get_preferences():
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403
    try:
        doc = db.collection("users").document(user_id).get()
        if doc.exists:
            prefs = doc.to_dict().get("preferences", {})
            return jsonify({"preferences": prefs}), 200
        else:
            return jsonify({"preferences": {}}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_id = data.get("user_id")
    user_message = data.get("message")
    session_id = data.get("session_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403


    if not user_message or not session_id:
        return jsonify({"error": "Both 'message' and 'session_id' are required."}), 400

    try:
        # Send message to Rasa
        rasa_response = requests.post(RASA_URL, json={
            "sender": user_id,
            "message": user_message,
            "metadata": {
                "userid": user_id  # or raw email, depending on your system
            }
        })
        rasa_response.raise_for_status()
        rasa_data = rasa_response.json()

        # Build message entry with timestamp
        entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "user_message": user_message,
            "bot_response": rasa_data
        }

        # Reference to Firestore path: users/{sender_id}/messages/{session_id}
        doc_ref = db.collection("users").document(user_id).collection("messages").document(session_id)

        # Append to the "messages" array in the session document
        doc_ref.set({
            "messages": firestore.ArrayUnion([entry])
        }, merge=True)

        # Return bot response to client
        return jsonify(rasa_data)

    except requests.RequestException as e:
        return jsonify({
            "error": "Failed to contact Rasa server",
            "details": str(e)
        }), 500

    except Exception as e:
        return jsonify({
            "error": "Unexpected server error",
            "details": str(e)
        }), 500

@app.route("/chat-sessions", methods=["GET"])
def list_message_sessions():
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    try:
        messages_ref = db.collection("users") \
                         .document(user_id) \
                         .collection("messages")

        sessions = messages_ref.stream()
        session_ids = [doc.id for doc in sessions]

        return jsonify({"sessions": session_ids})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat-history", methods=["GET"])
def chat_history():
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    session_id = request.args.get("session_id")

    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400

    try:
        session_doc = db.collection("users") \
            .document(user_id) \
            .collection("messages") \
            .document(session_id) \
            .get()

        if session_doc.exists:
            data = session_doc.to_dict()
            messages = data.get("messages", [])  # ← this is what you're seeing in Firebase
            return jsonify({"messages": messages}), 200
        else:
            return jsonify({"error": "Session not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recovery", methods=["POST"])
def save_recovery_key():
    data = request.get_json()
    user_id = data.get("user_id")
    raw_key = data.get("recovery_key")

    if not user_id or not raw_key:
        return jsonify({"error": "Missing user_id or recovery_key"}), 400

    hashed_key = bcrypt.hashpw(raw_key.encode(), bcrypt.gensalt()).decode()

    try:
        # Ensure the user document exists
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)

        # Save under meta → recovery
        recovery_doc = user_doc.collection("meta").document("recovery")
        recovery_doc.set({
            "recoveryHash": hashed_key,
            "createdAt": firestore.SERVER_TIMESTAMP
        })

        print("[DEBUG] Recovery key stored for:", user_id)
        return jsonify({"message": "Recovery key saved"}), 201

    except Exception as e:
        print("Recovery key save error:", str(e))
        return jsonify({"error": "Failed to save recovery key", "details": str(e)}), 500

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    alias = data.get("alias")
    recovery_key = data.get("recovery_key")
    new_password = data.get("new_password")

    if not alias or not recovery_key or not new_password:
        return jsonify({"error": "Missing fields"}), 400

    raw_email = f"{alias}@alias.local"

    try:
        user = auth.get_user_by_email(raw_email)
        uid = user.uid
        # Fetch stored hash from Firestore
        recovery_ref = firestore.client().collection("users").document(uid).collection("meta").document("recovery")
        doc = recovery_ref.get()

        if not doc.exists:
            return jsonify({"error": "Recovery key not set"}), 404

        stored_hash = doc.to_dict().get("recoveryHash")

        if not bcrypt.checkpw(recovery_key.encode(), stored_hash.encode()):
            return jsonify({"error": "Invalid recovery key"}), 403

        # Get user by email and update password
        user = auth.get_user_by_email(raw_email)
        auth.update_user(user.uid, password=new_password)

        return jsonify({"message": "Password reset successful"}), 200

    except Exception as e:
        print("[ERROR] Password reset failed:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/mood", methods=["POST"])
def submit_mood():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    mood_entry = {
        "mood": data.get("mood"),
        "timestamp": data.get("timestamp")
    }

    try:
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)
        user_doc.collection("mood").add(mood_entry)
        print("[DEBUG] Saving mood for:", user_id)
        return jsonify({"message": "Mood saved"}), 201

    except Exception as e:
        print("Mood save error:", str(e))
        return jsonify({"error": "Failed to save mood", "details": str(e)}), 500

@app.route("/mood", methods=["GET"])
def get_mood_entries():
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    try:
        mood_ref = db.collection("users").document(user_id).collection("mood")
        moods = mood_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).stream()

        mood_data = []
        for doc in moods:
            item = doc.to_dict()
            item["id"] = doc.id
            mood_data.append(item)

        return jsonify(mood_data), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch mood entries", "details": str(e)}), 500

@app.route("/assessment", methods=["POST"])
def submit_assessment():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

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
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

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
    user_id = data.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

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

@app.route("/journal", methods=["GET"])
def get_journal_entries():
    user_id = request.args.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    try:
        journal_ref = db.collection("users").document(user_id).collection("journal")
        entries = journal_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).stream()

        journal_data = []
        for doc in entries:
            item = doc.to_dict()
            item["id"] = doc.id
            journal_data.append(item)

        return jsonify(journal_data), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch journal entries", "details": str(e)}), 500


@app.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id != request.uid:
        return jsonify({"error": "Permission denied: UID mismatch"}), 403

    feedback = {
        "user_id": user_id,
        "rating": data.get("rating"),
        "comment": data.get("comment"),
        "timestamp": data.get("timestamp")
    }

    try:
        user_doc = db.collection("users").document(user_id)
        user_doc.set({}, merge=True)
        user_doc.collection("feedback").add(feedback)

        return jsonify({"message": "Feedback submitted"}), 201

    except Exception as e:
        return jsonify({"error": "Failed to submit feedback", "details": str(e)}), 500

@app.route("/feedback", methods=["GET"])
def get_feedback():
    token = request.headers.get("Authorization", "").split("Bearer ")[-1]

    try:
        decoded_token = auth.verify_id_token(token)
        is_admin = decoded_token.get("admin", False)

        if not is_admin:
            return jsonify({"error": "Forbidden: Admin access required"}), 403

        feedback_collection = db.collection_group("feedback").stream()
        feedback_list = []

        for doc in feedback_collection:
            entry = doc.to_dict()
            entry["id"] = doc.id
            feedback_list.append(entry)

        return jsonify(feedback_list), 200

    except Exception as e:
        print("[ERROR] Admin feedback access failed:", e)
        return jsonify({"error": "Unauthorized", "details": str(e)}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
