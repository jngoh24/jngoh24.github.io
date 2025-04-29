// Function to handle sending a query and displaying the response
async function sendQuery(query) {
  const responseDiv = document.getElementById('response');

  // Preserve previous messages (without initial content)
  const currentMessages = responseDiv.innerHTML;

  // Add the user's query to the response container
  responseDiv.innerHTML = currentMessages + `<p class="user-message"><strong>Question:</strong> ${query}</p>`;

  // Add a temporary "Loading..." message with an ID to remove later
  const loadingMessage = document.createElement("p");
  loadingMessage.className = "bot-message";
  loadingMessage.id = "loading-message";
  loadingMessage.textContent = "Loading...";
  responseDiv.appendChild(loadingMessage);

  try {
    const res = await fetch('https://askadam-api.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    });

    const data = await res.json();
    
    // Remove the "Loading..." message before displaying the response
    const loadingElement = document.getElementById("loading-message");
    if (loadingElement) loadingElement.remove();

    // Display the chatbot response
    if (data.error) {
      responseDiv.innerHTML += `<p class="bot-message" style="color:red;">Error: ${data.error}</p>`;

    } else {
      responseDiv.innerHTML += `<p class="bot-message"><strong>Answer:</strong><br>${data.response}</p>`;
    }
  } catch (err) {
    // Remove the "Loading..." message in case of error
    const loadingElement = document.getElementById("loading-message");
    if (loadingElement) loadingElement.remove();

    responseDiv.innerHTML += `<p class="bot-message" style="color:red;">Error: ${err.message}</p>`;
  }

  // Scroll to the bottom of the chat
  responseDiv.scrollTop = responseDiv.scrollHeight;
}

// Attach event listener to the form submission
document.getElementById('chatForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();
  if (query) {
    sendQuery(query);
    document.getElementById('query').value = ''; // Clear the input field
  }
});
