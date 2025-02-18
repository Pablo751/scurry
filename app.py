import os
import base64
from flask import Flask, request, jsonify

app = Flask(__name__)

# Retrieve your username and password from environment variables
USERNAME = os.environ.get("USERNAME", "default_user")
PASSWORD = os.environ.get("PASSWORD", "default_pass")

@app.route("/webhook", methods=["POST"])
def webhook():
    # Get the "Authorization" header
    auth_header = request.headers.get("Authorization")

    # Ensure the header exists and starts with "Basic "
    if not auth_header or not auth_header.startswith("Basic "):
        return jsonify({"error": "Unauthorized"}), 401

    # Decode the base64-encoded credentials
    encoded_credentials = auth_header.split(" ")[1]  # after "Basic "
    decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8")

    # The decoded string should be "username:password"
    user, pwd = decoded_credentials.split(":", 1)

    # Check if they match our environment variables
    if user != USERNAME or pwd != PASSWORD:
        return jsonify({"error": "Unauthorized"}), 401

    # If credentials are valid, process the webhook data
    data = request.get_json()
    print("Received webhook data:", data)
    return jsonify({"status": "success"}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
