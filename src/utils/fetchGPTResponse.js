export async function fetchChatGPTResponse(userInput) {
  try {
    const response = await fetch("/.netlify/functions/openaiChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Now, because of the header "Content-Type": "application/json", response.json() returns the actual data
    const data = await response.json();
    console.log("Received data from function:", data);
    // You no longer need to JSON.parse(data.body) because data is already parsed.
    return data.choices?.[0]?.message?.content ?? "No response.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}