

// Define the function to handle sending the message
function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
    if (!userMessage) return; // Don't send empty messages

    // Create a new chat message element for the user's message
    const chatBox = document.getElementById("chatBox");
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("user-msg");
    userMessageElement.innerHTML = userMessage;
    chatBox.appendChild(userMessageElement);

    // Clear the input field after sending
    document.getElementById("userInput").value = '';

    // Fetch the AI response
    fetchGroqData(userMessage);
}

// Define the function to handle AI response
async function fetchGroqData(prompt) {
    const apiKey = "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"; // Your API key
    const url = "https://api.groq.com/openai/v1/chat/completions"; // Groq API endpoint

    const requestBody = {
        model: "llama3-8b-8192", // Using the model from the API documentation
        messages: [
            {
                role: "user", // The role of the message sender
                content: prompt, // The user's input message
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Authorization header with your API key
            },
            body: JSON.stringify(requestBody) // Sending the structured request body
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from OpenAI API');
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content; // Assuming the API returns the message in this structure

        // Create a new chat message element for the AI's response
        const chatBox = document.getElementById("chatBox");
        const aiMessageElement = document.createElement("div");
        aiMessageElement.classList.add("ai-msg");
        aiMessageElement.innerHTML = aiMessage;
        chatBox.appendChild(aiMessageElement);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error: ", error);
    }
}

// Restart chat function
function restartChat() {
    // Clear all messages in the chat box
    document.getElementById("chatBox").innerHTML = '';

    // Optionally clear the input field
    document.getElementById("userInput").value = '';
}

const chatBox = document.querySelector('.chat-box');
chatBox.scrollTop = chatBox.scrollHeight;

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}


// Toggle the menu on click of the hamburger icon
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close the navigation menu if a menu link is clicked (for mobile view)
const navItems = document.querySelectorAll('#navLinks a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Close the navigation menu if anywhere else on the screen is clicked
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

// Close the navigation menu when the user scrolls down
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});
