from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from React frontend (http://localhost:3000 by default)

# Load Firebase Admin credentials
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred_path = os.path.join(BASE_DIR, "firebase-service-account.json")
cred = credentials.Certificate(cred_path)

firebase_admin.initialize_app(cred)

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
