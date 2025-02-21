import 'dotenv/config';
import express, { json } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path'; // Import the path module
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000; 

//  API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

//Gemini model and system instruction
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are AfyaAxis, a friendly healthcare assistant and should provide the symptoms of various malaria and recommendation from the user's prompt. Don't answer the user until they have provided you their name and email. verify the email and thank the user and output their name and email address in this format t {name: user's name} and {email: user's email address}. Answer all questions related to the healthcare.",
  });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

app.use(json()); // To parse JSON requests
// Serve static files (index.html, style.css, script.js)
app.use(express.static(__dirname));

app.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.message;

    // Start a new chat session)
    const chatSession = model.startChat({
        generationConfig,
        
    });

    const result = await chatSession.sendMessage(userMessage);
    res.json({ response: result.response.text() });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});