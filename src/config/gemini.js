/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        // Start the chat session with the model and config
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Send the prompt and get the result
        const result = await chatSession.sendMessage(prompt);

        // Access the response text from the result
        const responseText = result.response.text();
        console.log(responseText);

        // Return the response text
        return responseText;
    } catch (error) {
        console.error("Error during API call:", error);
        return null; // Handle errors and return a fallback value
    }
}

export default run;
