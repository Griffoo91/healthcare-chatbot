const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const message = userInput.value;
    userInput.value = '';

    displayMessage(message, 'user');

    // Send message to Node.js server (replace with your actual server endpoint)
    fetch('/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
  .then(response => response.json())
  .then(data => {
        displayMessage(data.response, 'bot');
    });
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
}