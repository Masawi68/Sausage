/* // Prices per item
const prices = {
    boerwors: 30,
    chakalaka: 30,
    pork: 20
  };
  
  // Initial quantities
  let quantities = {
    boerwors: 0,
    chakalaka: 0,
    pork: 0
  };
  
  // Function to update quantity and price
  function updateQty(item, change) {
    // Ensure quantity doesn't go below 0
    if (quantities[item] + change >= 0) {
      quantities[item] += change;
    }
  
    // Update the displayed quantity
    document.getElementById(`${item}-qty`).textContent = quantities[item];
  
    // Update the price
    document.getElementById(`${item}-price`).textContent = quantities[item] * prices[item];
  
    // Update total price
    updateTotalPrice();
  }
  
  function updateTotalPrice() {
    let total = (quantities.boerwors * prices.boerwors) +
                (quantities.chakalaka * prices.chakalaka) +
                (quantities.pork * prices.pork);
  
    // Select the total price element
    let totalPriceElement = document.getElementById("total-price");

    // Update only the numeric value while keeping "Pln" styled correctly
    totalPriceElement.innerHTML = `<span class="fs-3">${total}</span>`;
}


  
 // Function to reset order
function resetOrder() {
    // Reset quantities
    quantities = {
      boerwors: 0,
      chakalaka: 0,
      pork: 0
    };

    // Reset displayed quantities and prices
    document.getElementById("boerwors-qty").textContent = "0";
    document.getElementById("chakalaka-qty").textContent = "0";
    document.getElementById("pork-qty").textContent = "0";
    document.getElementById("boerwors-price").textContent = "0";
    document.getElementById("chakalaka-price").textContent = "0";
    document.getElementById("pork-price").textContent = "0";

    // Preserve the CSS styling of "Pln"
    let totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerHTML = `<span class="fs-3">0</span>`;
}

  // Add event listeners to the "Add" buttons
  document.querySelector(".btn-boer").addEventListener("click", () => updateQty('boerwors', 1));
  document.querySelector(".btn-chaka").addEventListener("click", () => updateQty('chakalaka', 1));
  document.querySelector(".btn-pork").addEventListener("click", () => updateQty('pork', 1));
  
  // Add event listener for "Cancel Order" button
  document.querySelector(".btn-danger").addEventListener("click", resetOrder);
  

  

  
  // Function to show a success toast
// Function to show a success toast
function showToast(message, isError = false) {
  Toastify({
      text: message,
      duration: 3000, // 3 seconds
      gravity: "top", // Top of the screen
      position: "right", // Right side of the screen
      backgroundColor: isError ? "linear-gradient(to right, #FF4E50, #FF6A00)" : "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true // Stops the toast when hovered
  }).showToast();
}

// Add event listener for the "order" button
document.querySelector(".order").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect form data
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Collect order details
  const orderDetails = {
      boerwors: quantities.boerwors,
      chakalaka: quantities.chakalaka,
      pork: quantities.pork,
      totalPrice: document.getElementById("total-price").textContent.trim()
  };

  // Check if no items have been selected
  if (quantities.boerwors === 0 && quantities.chakalaka === 0 && quantities.pork === 0) {
      showToast("Please add items to your order before submitting.", true); // Error toast
      return;
  }

  // Validate form fields (basic validation)
  if (!firstName || !email || !phone) {
      showToast("Please fill in all required fields.", true); // Error toast
      return;
  }

  // Construct order data object
  const orderData = {
      customer: {
          firstName,
          lastName,
          email,
          phone
      },
      order: orderDetails
  };

  console.log("Order Data:", orderData); // Log to console for debugging

  // Example: Send data to a backend (modify URL accordingly)
  fetch("https://your-backend-endpoint.com/submit-order", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
  })
  .then(response => response.json())
  .then(data => {
      console.log("Success:", data);
      showToast("Thank you for ordering!"); // Success toast
      resetOrder(); // Reset form and order after successful submission
  })
  .catch(error => {
      console.error("Error:", error);
      showToast("There was an error submitting your order. Please try again.", true); // Error toast
  });
});
  */




/* 
const scriptURL = 'https://script.google.com/macros/s/AKfycbwr83CnT8wtpuIf2uRH3AB3XXd7fupupwhag4ysGnuOtRK580TeKnwlygV5krNNt-hZ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML= ""
        },5000)
        form.reset()
    }) 
    .catch(error => console.error('Error!', error.message))
}) */




/*     const prices = {
      boerwors: 30,
      chakalaka: 30,
      pork: 20
    };
    
    // Initial quantities
    let quantities = {
      boerwors: 0,
      chakalaka: 0,
      pork: 0
    };
    
    // Function to update quantity and price
    function updateQty(item, change) {
      if (quantities[item] + change >= 0) {
        quantities[item] += change;
      }
      document.getElementById(`${item}-qty`).textContent = quantities[item];
      document.getElementById(`${item}-price`).textContent = quantities[item] * prices[item];
      updateTotalPrice();
    }
    
    // Update the total price
    function updateTotalPrice() {
      let total = (quantities.boerwors * prices.boerwors) +
                  (quantities.chakalaka * prices.chakalaka) +
                  (quantities.pork * prices.pork);
      document.getElementById("total-price").innerHTML = `<span class="fs-3">${total}</span>`;
    }
    
    // Reset order
    function resetOrder() {
      quantities = { boerwors: 0, chakalaka: 0, pork: 0 };
      document.getElementById("boerwors-qty").textContent = "0";
      document.getElementById("chakalaka-qty").textContent = "0";
      document.getElementById("pork-qty").textContent = "0";
      document.getElementById("boerwors-price").textContent = "0";
      document.getElementById("chakalaka-price").textContent = "0";
      document.getElementById("pork-price").textContent = "0";
      document.getElementById("total-price").innerHTML = `<span class="fs-3">0</span>`;
    }
    
    // Event listeners for buttons to add items
    const boerworsButton = document.querySelector(".btn-boer");
    const chakalakaButton = document.querySelector(".btn-chaka");
    const porkButton = document.querySelector(".btn-pork");
    
    boerworsButton.addEventListener("click", () => updateQty("boerwors", 1));
    chakalakaButton.addEventListener("click", () => updateQty("chakalaka", 1));
    porkButton.addEventListener("click", () => updateQty("pork", 1));
    
    // Capture the order details for submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwr83CnT8wtpuIf2uRH3AB3XXd7fupupwhag4ysGnuOtRK580TeKnwlygV5krNNt-hZ/exec';
    
    document.querySelector(".order").addEventListener("click", () => {
      const formData = new FormData();
      formData.append("Name", document.getElementById("firstName").value);
      formData.append("Last Name", document.getElementById("lastName").value);
      formData.append("Email", document.getElementById("email").value);
      formData.append("Phone", document.getElementById("phone").value);
      formData.append("BoerworsQty", quantities.boerwors);
      formData.append("ChakalakaQty", quantities.chakalaka);
      formData.append("PorkQty", quantities.pork);
      formData.append("Total", document.getElementById("total-price").innerText);
    
      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
          alert("Order submitted successfully!");
          resetOrder();
          document.getElementById("firstName").value = "";
          document.getElementById("lastName").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
        })
        .catch(error => console.error('Error!', error.message));
    });
     */


    
 // --- Order Submission Code (unchanged) ---
const prices = {
  boerwors: 30,
  chakalaka: 30,
  pork: 20
};

// Initial quantities
let quantities = {
  boerwors: 0,
  chakalaka: 0,
  pork: 0
};

function updateQty(item, change) {
  if (quantities[item] + change >= 0) {
    quantities[item] += change;
  }
  document.getElementById(`${item}-qty`).textContent = quantities[item];
  document.getElementById(`${item}-price`).textContent = quantities[item] * prices[item];
  updateTotalPrice();
}

function updateTotalPrice() {
  let total = (quantities.boerwors * prices.boerwors) +
              (quantities.chakalaka * prices.chakalaka) +
              (quantities.pork * prices.pork);
  document.getElementById("total-price").innerHTML = `<span class="fs-3">${total}</span>`;
}

function resetOrder() {
  quantities = { boerwors: 0, chakalaka: 0, pork: 0 };
  document.getElementById("boerwors-qty").textContent = "0";
  document.getElementById("chakalaka-qty").textContent = "0";
  document.getElementById("pork-qty").textContent = "0";
  document.getElementById("boerwors-price").textContent = "0";
  document.getElementById("chakalaka-price").textContent = "0";
  document.getElementById("pork-price").textContent = "0";
  document.getElementById("total-price").innerHTML = `<span class="fs-3">0</span>`;
}

const boerworsButton = document.querySelector(".btn-boer");
const chakalakaButton = document.querySelector(".btn-chaka");
const porkButton = document.querySelector(".btn-pork");

boerworsButton.addEventListener("click", () => updateQty("boerwors", 1));
chakalakaButton.addEventListener("click", () => updateQty("chakalaka", 1));
porkButton.addEventListener("click", () => updateQty("pork", 1));

const scriptURL = 'https://script.google.com/macros/s/AKfycbwzAbOup9RAkfZyhMiI5zZsX4Fxwafm717SzsoDofHzkzGRoZZWDdF0SbFt8n9Vk1J1/exec';

document.querySelector(".order").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const totalOrder = parseInt(document.getElementById("total-price").innerText);
  const timeStamp = new Date().toLocaleString();

  if (!firstName || !phone) {
    Toastify({
      text: "Please fill out all fields before submitting.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336"
    }).showToast();
    return;
  }

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

  const formData = new FormData();
  formData.append("Name", firstName);
  formData.append("Last Name", lastName);
  formData.append("Email", email);
  formData.append("Phone", phone);
  formData.append("BoerworsQty", quantities.boerwors);
  formData.append("ChakalakaQty", quantities.chakalaka);
  formData.append("PorkQty", quantities.pork);
  formData.append("Total", totalOrder);
  formData.append("Time-Stamp", timeStamp);

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
      resetOrder();
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
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

/* document.addEventListener("DOMContentLoaded", function () {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  document.querySelector(".background-section").style.paddingTop = navbarHeight + "px";
});


  document.getElementById("chatbot-header").addEventListener("click", function() {
    var chatbotBody = document.getElementById("chatbot-body");
    if (chatbotBody.style.display === "none" || chatbotBody.style.display === "") {
      // Open the chat
      chatbotBody.style.display = "block";
    } else {
      // Close the chat and reset session
      chatbotBody.style.display = "none";
      resetChat();
    }
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
    "Garlic": "Sorry, at the moment we do not have garlic sausage",
    "delivery": "Delivery available on Saturdays for orders of 2 or more sausages.",
    "deliver": "Delivery available on Saturdays for orders of 2 or more sausages.",
    "beef": "Sorry, we do not have beef sausage.",
    "beef bones": "We don't have beef bones.",
    "bones": "We don't have beef bones.",
    "order": "You can place your order using the form on our site.",
    "price": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. Pork Sausage - 20 Pln",
    "how much": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. Pork Sausage - 20 Pln",
    "contact": "Feel free to use the contact form or call us directly on +48 734 808 360."
  };
  

  // Append a message to the chat window
  function appendMessage(sender, text) {
    var messagesDiv = document.getElementById('chatbot-messages');
    var messageDiv = document.createElement('div');
    messageDiv.className = "message";
    messageDiv.innerHTML = "<strong>" + sender + ":</strong> " + text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
  }

  // Process user's message and check for keywords in the responses dictionary
  function processMessage(message) {
    message = message.toLowerCase();
    let foundResponse = false;
    for (let keyword in responses) {
      if (message.includes(keyword)) {
        appendMessage("Bot", responses[keyword]);
        foundResponse = true;
        break; // Remove break if you want multiple responses
      }
    }
    if (!foundResponse) {
      appendMessage("Bot", "I'm sorry, I don't have an answer for that. Please contact us using the form. Thank you!");
    }
  }

  // Listen for the Enter key on the input field
  document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      let userMessage = this.value.trim();
      if (userMessage !== "") {
        appendMessage("You", userMessage);
        processMessage(userMessage);
        this.value = "";
      }
    }
  });



// Function to reset the chat session
function resetChat() {
  // Clear chat messages
  document.getElementById('chatbot-messages').innerHTML = "";
  // Clear the input field
  document.getElementById('chatbot-input').value = "";
  // If you have any timers or other state, clear or reset them here
}

// Toggle the chat window and reset when closing */


document.addEventListener("DOMContentLoaded", function () {
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  document.querySelector(".background-section").style.paddingTop = navbarHeight + "px";
});

document.getElementById("chatbot-header").addEventListener("click", function() {
  var chatbotBody = document.getElementById("chatbot-body");
  if (chatbotBody.style.display === "none" || chatbotBody.style.display === "") {
    chatbotBody.style.display = "block"; // Open chat
  } else {
    chatbotBody.style.display = "none"; // Close chat & reset session
    resetChat();
  }
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
  "delivery": "Delivery available on Saturdays for orders of 2 or more sausages.",
  "deliver": "Delivery available on Saturdays for orders of 2 or more sausages.",
  "beef bones": "We don't have beef bones.",  // ✅ Exact match for "beef bones"
  "bones": "We don't have beef bones.",
  "beef": "Sorry, we do not have beef sausage.", // ✅ Now this won’t trigger for "beef bones"
  "order": "You can place your order using the form on our site.",
  "price": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. Pork Sausage - 20 Pln",
  "how much": "Our Products and Prices:<br>1. Boerwors - 30 Pln<br>2. Chakalaka - 30 Pln<br>3. Pork Sausage - 20 Pln",
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

  // ✅ First, check for exact match
  if (responses.hasOwnProperty(message)) {
    appendMessage("Bot", responses[message]);
    return;
  }

  // ✅ Then, check for partial matches
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
    let userMessage = this.value.trim();
    if (userMessage !== "") {
      appendMessage("You", userMessage);
      processMessage(userMessage);
      this.value = "";
    }
  }
});

// Function to reset the chat session
function resetChat() {
  document.getElementById('chatbot-messages').innerHTML = ""; // Clear messages
  document.getElementById('chatbot-input').value = ""; // Clear input field
}
