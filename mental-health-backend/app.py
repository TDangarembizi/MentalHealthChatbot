from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
import requests
from dotenv import load_dotenv
import os

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

# Rasa server URL
RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route("/")
def index():
    return {"message": "Flask backend is running!"}

# 🔐 Protected Firebase auth route
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

# 💬 Chatbot interaction endpoint
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
