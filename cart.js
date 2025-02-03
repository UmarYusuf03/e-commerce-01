// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Populate cart items
/*function populateCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.innerText = '0.00';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        totalPriceElement.innerText = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
}*/

// Remove item from cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const productId = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        populateCart();
        updateCartCount();
    }
});

// Redirect to checkout page
document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

// Update cart count
/*function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}*/

// Initialize cart count
updateCartCount();

// Populate cart on page load
populateCart();

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 }); // Add new product
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count on the page
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.innerText = totalQuantity;
    }
}

// Call this function on every page load
updateCartCount();

// Function to populate the cart page
function populateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear previous content
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.innerText = '0.00';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Calculate and display total price
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }
}

// Call this function on page load
populateCart();

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

        // Add product to cart
        addToCart(productId, productName, productPrice);

        // Optional: Show a confirmation message
        alert(`${productName} has been added to your cart!`);
    });
});

// Handle "Remove Item" button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const productId = e.target.getAttribute('data-id');

        // Retrieve cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove the item from the cart
        cart = cart.filter(item => item.id !== productId);

        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Repopulate the cart and update the cart count
        populateCart();
        updateCartCount();
    }
});