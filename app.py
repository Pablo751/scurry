from flask import Flask, request, jsonify
import os

app = Flask(__name__)

WEBHOOK_TOKEN = os.environ.get("WEBHOOK_TOKEN", "default_token")

@app.route("/webhook", methods=["POST"])
def webhook():
    auth_header = request.headers.get("Authorization")
    if not auth_header or auth_header != f"Bearer {WEBHOOK_TOKEN}":
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    print("Received webhook data:", data)
    return jsonify({"status": "success"}), 200

if __name__ == "__main__":
    # Default to port 5000, but use the PORT env var if it’s set (Railway sets it automatically)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
