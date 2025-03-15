function searchBooks() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let books = document.querySelectorAll("#bookList .col-md-3");
    let found = false;
    books.forEach(book => {
        let title = book.querySelector(".card-title").innerText.toLowerCase();
        book.style.display = title.includes(input) ? "block" : "none";
        found = found || title.includes(input);
    });
    if (!found) alert("No results found.");
}

// Temporary cart array
let cart = [];

// Function to add an item to the cart
function addToCart(title, price) {
    cart.push({ title, price: parseFloat(price) });
    saveCart();
    alert(title + " added to cart!");
}

// Function to save cart data to `window.name` (persists between pages)
function saveCart() {
    window.name = JSON.stringify(cart);
}

// Function to load the cart from `window.name` when navigating to cart.html
function loadCart() {
    if (window.name) {
        cart = JSON.parse(window.name);
    }
    updateCartUI();
}

// Function to update the cart UI (used in cart.html)
function updateCartUI() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear previous cart display

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
            totalPrice += item.price;
        });

        document.getElementById("cart-total").innerText = totalPrice.toFixed(2);
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    window.name = ""; // Reset stored cart data
    updateCartUI();
    alert("cart is empty");
}

// Auto-load cart when `cart.html` is opened
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cart-items")) {
        loadCart();
    }
});


function buyNow(bookName, price) {
    document.getElementById("selectedBook").textContent = bookName;
    document.getElementById("selectedPrice").textContent = price.toFixed(2);
    let modal = new bootstrap.Modal(document.getElementById('buyNowModal'));
    modal.show();

    let orderForm = document.getElementById("orderForm");

    // Remove any previously added event listeners to prevent duplicate alerts
    orderForm.onsubmit = function(event) {
        event.preventDefault(); // Prevent form submission

        // Convert name to uppercase
        let nameInput = document.getElementById("customerName");
        nameInput.value = nameInput.value.toUpperCase();

        // Validate phone number (should be exactly 10 digits)
        let phoneInput = document.getElementById("customerPhone");
        let phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(phoneInput.value)) {
            alert("Please enter a valid 10-digit phone number.");
            return; // Stop form submission if phone is invalid
        }

        alert("Your order has been placed successfully!");
        orderForm.reset(); // Reset form fields
        modal.hide(); // Close modal
    };
}


