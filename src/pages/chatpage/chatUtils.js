// Function to send a query to the Hugging Face model
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL =
  "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";
async function query(data) {
  if (!API_KEY) {
    console.error(
      "API key is missing. Please check your environment variables."
    );
    throw new Error("API key is missing");
  }
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(API_URL, requestOptions);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error from Hugging Face API:", error);
      throw new Error(error.error || "Failed to get response from API");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error querying the model:", error);
    throw new Error("An error occurred while querying the model");
  }
}
// Function to process user input and fetch bot response
export const getBotResponse = async (userMessage) => {
  if (!userMessage || typeof userMessage !== "string") {
    console.error("Invalid input. User message must be a non-empty string.");
    return "Invalid input. Please enter a valid message.";
  }

  try {
    const response = await query({ inputs: userMessage });
    const botReply = response[0]?.generated_text || "No response generated";
    return botReply;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, I encountered an error while processing your message.";
  }
};

/* eslint-disable no-loop-func */
const streamText = (message, messages, setStreamedMessages) => {
  const { text, sender } = message;
  let currentText = "";
  const newMessages = [...messages]; // Preserve existing messages

  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      currentText += text[i];
      const updatedMessage = { text: currentText, sender };
      newMessages[newMessages.length - 1] = updatedMessage; // Update the latest message

      setStreamedMessages([...newMessages]); // Update the local state
    }, i * 30); // Adjust delay per character
  }
};

export { streamText };
