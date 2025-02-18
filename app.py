import os
import base64
from flask import Flask, request, jsonify

app = Flask(__name__)

USERNAME = os.environ.get("USERNAME", "default_user")
PASSWORD = os.environ.get("PASSWORD", "default_pass")

@app.route("/webhook", methods=["POST"])
def webhook():
    # Basic Auth check
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Basic "):
        return jsonify({"error": "Unauthorized"}), 401

    encoded_credentials = auth_header.split(" ")[1]
    decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8")
    user, pwd = decoded_credentials.split(":", 1)

    if user != USERNAME or pwd != PASSWORD:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    print("Received webhook data:", data)
    return jsonify({"status": "success"}), 200
