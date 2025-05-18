 // --- Order Submission Code (unchanged) ---
const prices = {
  boerwors: 25,
  chakalaka: 25,
  //pork: 20
};

// Initial quantities
let quantities = {
  boerwors: 0,
  chakalaka: 0,
  //pork: 0
};




 


let stock = {}; // will be updated from backend

fetch("https://script.google.com/macros/s/AKfycbzIf81-j2aXzXwZgqr6Bz_HY48zq-PPplUhsbSsQUXVef1DgN0PYDG0xQ1xx9yPgNeB/exec")
  .then(response => response.json())
  .then(data => {
    stock = data;
    updateStockDisplay();
  })
  .catch(error => {
    console.error("Failed to fetch stock data:", error);
    Toastify({
      text: "Failed to load stock data!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
  });

function updateQty(item, change) {
  // Only allow adding if there's stock available
  if (change > 0) {
    if (quantities[item] < stock[item]) {
      quantities[item] += change;
    } else {
      Toastify({
        text: `Sorry ${item.charAt(0).toUpperCase() + item.slice(1)} is out of stock!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336"
      }).showToast();
      return;
    }
  } else if (quantities[item] + change >= 0) {
    quantities[item] += change;
  }

  document.getElementById(`${item}-qty`).textContent = quantities[item];
  document.getElementById(`${item}-price`).textContent = quantities[item] * prices[item];
  updateTotalPrice();
}

function updateStockDisplay() {
  console.log("Current stock:", stock);
  // Optional: update UI text if needed
  // document.getElementById("boerwors-stock").textContent = stock.boerwors;
  // document.getElementById("chakalaka-stock").textContent = stock.chakalaka;
}

function updateTotalPrice() {
  let total = (quantities.boerwors * prices.boerwors) +
              (quantities.chakalaka * prices.chakalaka); //+
              //(quantities.pork * prices.pork);
  document.getElementById("total-price").innerHTML = `<span class="fs-3">${total}</span>`;
}

function resetOrder() {
  quantities = { boerwors: 0, chakalaka: 0};
  document.getElementById("boerwors-qty").textContent = "0";
  document.getElementById("chakalaka-qty").textContent = "0";
  //document.getElementById("pork-qty").textContent = "0";
  document.getElementById("boerwors-price").textContent = "0";
  document.getElementById("chakalaka-price").textContent = "0";
  //document.getElementById("pork-price").textContent = "0";
  document.getElementById("total-price").innerHTML = `<span class="fs-3">0</span>`;
  document.querySelector(".custom-form").reset();
}

const boerworsButton = document.querySelector(".btn-boer");
const chakalakaButton = document.querySelector(".btn-chaka");
//const porkButton = document.querySelector(".btn-pork");

boerworsButton.addEventListener("click", () => updateQty("boerwors", 1));
chakalakaButton.addEventListener("click", () => updateQty("chakalaka", 1));
//porkButton.addEventListener("click", () => updateQty("pork", 1));

const scriptURL = 'https://script.google.com/macros/s/AKfycbzIf81-j2aXzXwZgqr6Bz_HY48zq-PPplUhsbSsQUXVef1DgN0PYDG0xQ1xx9yPgNeB/exec';


document.querySelector(".order").addEventListener("click", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const totalOrder = parseInt(document.getElementById("total-price").innerText);
  const timeStamp = new Date().toLocaleString();

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate first name
  if (!firstName || !nameRegex.test(firstName)) {
    Toastify({
      text: "Please enter a valid name (letters only).",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
    return;
  }

  // Validate phone
  if (!phone || !phoneRegex.test(phone)) {
    Toastify({
      text: "Please enter a valid phone number (digits only, min 6).",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
    return;
  }

  // Validate email
  if (!email || !emailRegex.test(email)) {
    Toastify({
      text: "Please enter a valid email address.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
    return;
  }

  // Validate total order
  if (totalOrder === 0) {
    Toastify({
      text: "Please add at least one item to your order before submitting.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
    return;
  }

  // Passed all validations – submit
  const formData = new FormData();
  formData.append("Name", firstName);
  formData.append("Last Name", lastName);
  formData.append("Email", email);
  formData.append("Phone", phone);
  formData.append("BoerworsQty", quantities.boerwors);
  formData.append("ChakalakaQty", quantities.chakalaka);
  formData.append("Total", totalOrder);
  formData.append("Time-Stamp", timeStamp);

  formData.append("formType", "order");
  const submitButton = document.querySelector(".order");
  submitButton.innerHTML = "Submitting... <span class='spinner-border spinner-border-sm'></span>";
  submitButton.disabled = true;

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
   .then(() => {
  Toastify({
    text: "Thank you for ordering!",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#4CAF50"
  }).showToast();

  stock.boerwors -= quantities.boerwors;
  stock.chakalaka -= quantities.chakalaka;
  // Clear form fields
  document.querySelector(".custom-form").reset();

  // Clear order table values
  resetOrder();
})

    .catch(error => console.error('Error!', error.message))
    .finally(() => {
      submitButton.innerHTML = "Submit Order";
      submitButton.disabled = false;
    });
});


// --- Review Form Submission Code ---
["reviewForm-md", "reviewForm-sm"].forEach(function(formId) {
  document.getElementById(formId).addEventListener("submit", function(e) {
    e.preventDefault();
  const form = this;
  const formData = new FormData(form);
  // Append the current timestamp (Apps Script will also set its own date for the Time-Stamp column)
  formData.append("Time-Stamp", new Date().toLocaleString());

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.innerHTML = "Submitting... <span class='spinner-border spinner-border-sm'></span>";
  submitButton.disabled = true;
  formData.append("formType", "review");  // Add this line

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(() => {
      Toastify({
        text: "Thank you for your feedback",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50"
      }).showToast();
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      Toastify({
        text: "Error submitting review.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336"
      }).showToast();
    })
    .finally(() => {
      submitButton.innerHTML = "Submit <i class='ms-1 fas fa-paper-plane'></i>";
      submitButton.disabled = false;
    });
  });
});


document.querySelectorAll("form[name='submit-to-google-sheet-contact']").forEach(function(form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    // Append the current timestamp and the form type for identification on the server
    formData.append("Time-Stamp", new Date().toLocaleString());
    formData.append("formType", "contact");

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.innerHTML = "Submitting... <span class='spinner-border spinner-border-sm'></span>";
    submitButton.disabled = true;

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(() => {
        Toastify({
          text: "Thank you for contacting us!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4CAF50"
        }).showToast();
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        Toastify({
          text: "Error submitting contact form.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336"
        }).showToast();
      })
      .finally(() => {
        submitButton.innerHTML = "Submit <i class='ms-1 fas fa-paper-plane'></i>";
        submitButton.disabled = false;
      });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  document.querySelector(".background-section").style.paddingTop = navbarHeight + "px";
});

document.getElementById("chatbot-header").addEventListener("click", function() {
  var chatbotBody = document.getElementById("chatbot-body");
  var closeButton = document.getElementById("chatbot-close");
  if (chatbotBody.style.display === "none" || chatbotBody.style.display === "") {
    chatbotBody.style.display = "block"; // Open chat
    closeButton.style.display = "inline"; // Show close button
  } else {
    chatbotBody.style.display = "none"; // Close chat & reset session
    closeButton.style.display = "none"; // Hide close button
    resetChat();
  }
});

// Close chatbot when clicking ❌
document.getElementById("chatbot-close").addEventListener("click", function(event) {
  event.stopPropagation(); // Prevents triggering the header toggle
  document.getElementById("chatbot-body").style.display = "none";
  document.getElementById("chatbot-close").style.display = "none"; // Hide close button
  resetChat();
});

// Dictionary mapping keywords to responses
const responses = {
  "hello": "How are you? How can I be of help?",
  "ask": "How can I help you?",
  "hi": "How are you? How can I be of help?",
  "bye": "Thank you for visiting our website, have a great day!",
  "no": "Thank you for visiting our website, have a great day!",
  "see you": "Thank you for visiting our website, have a great day!",
  "thank you": "You are welcome. Is there anything else I can assist you with?",
  "thank u": "You are welcome. Is there anything else I can assist you with?",
  "thanx": "You are welcome. Is there anything else I can assist you with?",
  "hey": "How are you? How can I be of help?",
  "garlic": "Sorry, at the moment we do not have garlic sausage.",
  "delivery": "Delivery available on Saturdays for orders of 2 or more sausages within Warsaw.",
  "deliver": "Delivery available on Saturdays for orders of 2 or more sausages within Warsaw.",
  "beef": "Sorry, we do not have beef sausage.", 
  "order": "You can place your order using the form on our site.",
  "price": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. ",
  "prices": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. ",
  "how much": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. ",
  "contact": "Feel free to use the contact form or call us directly on +48 734 808 360."
};

// Append a message to the chat window
function appendMessage(sender, text) {
  var messagesDiv = document.getElementById('chatbot-messages');
  var messageDiv = document.createElement('div');
  messageDiv.className = "message";
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}

// Process user's message and check for exact or partial matches
function processMessage(message) {
  message = message.toLowerCase().trim();

  if (responses.hasOwnProperty(message)) {
    appendMessage("Bot", responses[message]);
    return;
  }

  for (let keyword in responses) {
    let regex = new RegExp("\\b" + keyword + "\\b", "i");
    if (regex.test(message)) {
      appendMessage("Bot", responses[keyword]);
      return;
    }
  }

  // No match found, send default response
  appendMessage("Bot", "I'm sorry, I don't have an answer for that. Please contact us using the form. Thank you!");
}

// Listen for the Enter key on the input field
document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Send button click event listener
document.getElementById('chatbot-send').addEventListener('click', sendMessage);

// Function to send the message
function sendMessage() {
  let inputField = document.getElementById('chatbot-input');
  let userMessage = inputField.value.trim();
  if (userMessage !== "") {
    appendMessage("You", userMessage);
    processMessage(userMessage);
    inputField.value = "";
  }
}

function resetChat() {
  document.getElementById('chatbot-messages').innerHTML = "";
  document.getElementById('chatbot-input').value = ""; 
}

document.getElementById("info-icon").addEventListener("click", function () {
  var message = document.getElementById("info-message");
  message.classList.toggle("d-none"); // Toggle visibility

  // If message is shown, hide it after 5 seconds
  if (!message.classList.contains("d-none")) {
    setTimeout(function () {
      message.classList.add("d-none");
    }, 5000);
  }
});

document.getElementById("info-icon1").addEventListener("click", function () {
  var message = document.getElementById("info-message1");
  message.classList.toggle("d-none"); // Toggle visibility

  // If message is shown, hide it after 5 seconds
  if (!message.classList.contains("d-none")) {
    setTimeout(function () {
      message.classList.add("d-none");
    }, 5000);
  }
});


document.getElementById("info-icon1a").addEventListener("click", function () {
  var message = document.getElementById("info-message1a");
  message.classList.toggle("d-none"); // Toggle visibility

  // If message is shown, hide it after 5 seconds
  if (!message.classList.contains("d-none")) {
    setTimeout(function () {
      message.classList.add("d-none");
    }, 5000);
  }
});


document.getElementById("info-icon2").addEventListener("click", function () {
  var message = document.getElementById("info-message2");
  message.classList.toggle("d-none"); // Toggle visibility

  // If message is shown, hide it after 5 seconds
  if (!message.classList.contains("d-none")) {
    setTimeout(function () {
      message.classList.add("d-none");
    }, 5000);
  }
});

document.getElementById("info-icon2a").addEventListener("click", function () {
  var message = document.getElementById("info-message2a");
  message.classList.toggle("d-none"); // Toggle visibility

  // If message is shown, hide it after 5 seconds
  if (!message.classList.contains("d-none")) {
    setTimeout(function () {
      message.classList.add("d-none");
    }, 5000);
  }
});