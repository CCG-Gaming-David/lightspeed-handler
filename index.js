const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const crypto = require('crypto');

const app = express();
//const SECRET = 'your-secret'; // Replace with your actual secret

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.post('/webhook', async (req, res) => {
  // Extracting components
  const signature = req.headers['x-signature']; // Signature from the header
  const event = req.headers['x-event']; // Event type from the header
  const payload = req.body; // Webhook data from the body

  // Verifying the signature
  //const hash = crypto.createHmac('sha256', SECRET).update(req.rawBody).digest('hex');
  //if (hash !== signature) {
  //  return res.status(403).send('Signature does not match');
  //}

  console.log(`Received ${event}`);
  console.log(payload);

  // Asynchronously notify another server
  try {
    const response = await fetch('http://example.com/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data: payload })
    });

    const data = await response.json();
    console.log('Notification sent, received response:', data);
  } catch (error) {
    console.log('Error notifying other server:', error);
  }

  // Sending response back to the webhook provider
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server is listening on port 3000'));