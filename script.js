const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Helper to display messages
function appendMessage(message, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.textContent = message;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send user input to backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    appendMessage(message, "user-msg");
    userInput.value = "";

    // Show a loading message from the bot
    const loadingMsg = document.createElement("div");
    loadingMsg.classList.add("message", "bot-msg");
    loadingMsg.textContent = "Thinking...";
    chatContainer.appendChild(loadingMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const res = await fetch("http://localhost:8000/chat", { // Change to your backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_message: message })
        });
        const data = await res.json();

        // Replace loading text with actual bot response
        loadingMsg.textContent = data.bot_response || "[No response]";
    } catch (error) {
        loadingMsg.textContent = "Error: Could not reach server.";
        console.error(error);
    }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

