from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from React frontend (http://localhost:3000 by default)

from dotenv import load_dotenv
import os

load_dotenv()  # Load .env into environment

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

@app.route("/")
def index():
    return {"message": "Flask backend is running!"}

# 🔐 Protected endpoint: requires valid Firebase ID token
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

if __name__ == "__main__":
    app.run(debug=True)
