const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

app.post('/webhook', async (req, res) => {
    try {
        const webhookData = req.body;

        // Simulate some async processing
        await processWebhookData(webhookData);

        // Send a 200 status code response
        res.sendStatus(200);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.sendStatus(500);
    }
});

async function processWebhookData(data) {
    // This function simulates some asynchronous processing of the data
    // In a real-world scenario, this could be saving data to a database, calling an API, etc.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Webhook data:', data);
            resolve();
        }, 2000);
    });
}

app.listen(3000, () => console.log('Server is listening on port 3000'));