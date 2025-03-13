const HF_API_KEY = "hf_yourapikeyhere";  // Replace with your Hugging Face API key
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B";

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p class='user-message'>👤 ${userInput}</p>`;

    try {
        let response = await fetch(HF_MODEL_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "inputs": userInput })
        });

        let result = await response.json();
        let botReply = result[0]?.generated_text || "Sorry, I am unable to process that.";

        chatbox.innerHTML += `<p class='bot-message'>🤖 ${botReply}</p>`;
    } catch (error) {
        chatbox.innerHTML += `<p class='bot-message'>⚠️ Error: Unable to reach AI model.</p>`;
    }

    // Scroll to the latest message
    chatbox.scrollTop = chatbox.scrollHeight;
    document.getElementById("userInput").value = "";
}
