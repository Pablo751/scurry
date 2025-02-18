require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

// Basic Auth configuration
app.use(basicAuth({
    users: { [process.env.USERNAME]: process.env.PASSWORD },
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
}));

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received order data:', req.body);
    res.status(200).send('Webhook received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));