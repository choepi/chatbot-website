async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p class='user-message'>👤 ${userInput}</p>`;

    // Send user message to backend
    let response = await fetch("https://your-backend-api.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "message": userInput })
    });

    let result = await response.json();
    chatbox.innerHTML += `<p class='bot-message'>🤖 ${result.response}</p>`;

    // Scroll to the latest message
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // Clear input field
    document.getElementById("userInput").value = "";
}
