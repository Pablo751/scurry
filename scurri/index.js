require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

// Log every incoming request for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Unprotected health check endpoints
app.get('/', (req, res) => {
  res.send("OK");
});

app.get('/health', (req, res) => {
  res.send("OK");
});

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

// Protected webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Webhook Data:', req.body);
  res.status(200).json({ status: "success", message: "Webhook received" });
});

// Start server on the Railway-provided port
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
