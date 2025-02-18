require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

// Debugging logs
console.log("🚀 Starting server...");
console.log("✅ PORT:", process.env.PORT || "Default 3000");
console.log("✅ USERNAME:", process.env.USERNAME || "NOT SET");
console.log("✅ PASSWORD:", process.env.PASSWORD ? "******" : "NOT SET");

// Basic authentication setup
const authUsers = {};
if (process.env.USERNAME && process.env.PASSWORD) {
    authUsers[process.env.USERNAME] = process.env.PASSWORD;
    app.use(basicAuth({
        users: authUsers,
        challenge: true,
        unauthorizedResponse: 'Unauthorized'
    }));
} else {
    console.error("❌ ERROR: Missing USERNAME or PASSWORD!");
    process.exit(1);
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('📩 Received Webhook Data:', req.body);
    res.status(200).json({ status: "success", message: "Webhook received" });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));
