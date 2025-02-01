const { Configuration, OpenAIApi } = require("openai");
const fetch = require("node-fetch");


// netlify/functions/openaiChat.js

exports.handler = async (event, context) => {
  try {
    // Parse the request body (if you're sending JSON from the front end)
    const { prompt } = JSON.parse(event.body);

    // Read your OpenAI key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    // Construct your request to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    // Return the result to the front end
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to call OpenAI API" }),
    };
  }
};
