const responses = {
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a nice day!"
};

function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    // Show user message
    addMessage(message, "user");

    // Bot reply
    setTimeout(() => {
        let reply = "I don't understand.";
        for (let key in responses) {
            if (message.toLowerCase().includes(key)) {
                reply = responses[key];
                break;
            }
        }
        addMessage(reply, "bot");
    }, 500);

    input.value = "";
}

function addMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
