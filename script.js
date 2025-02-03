// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Function to update the cart count
function updateCartCount() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.innerText = totalQuantity;
    }
}

// Update cart UI
function updateCartUI() {
    if (cartItemsContainer) {
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

            // Add event listeners to "Remove" buttons
            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    removeFromCart(productId);
                });
            });

            // Calculate and display total price
            const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
            totalPriceElement.innerText = totalPrice.toFixed(2);
        }
    }
}

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    console.log(`Adding product to cart: ID=${productId}, Name=${productName}, Price=${productPrice}`);
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count and UI
    updateCartCount();
    updateCartUI();

    // Show notification
    showNotification(`${productName} added to cart`);

    // Dynamically update the "Add to Cart" button text
    const addButton = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    if (addButton) {
        const updatedCartItem = cart.find(item => item.id === productId);
        const updatedQuantity = updatedCartItem ? updatedCartItem.quantity : 0;
        addButton.innerText = updatedQuantity > 0 ? `Added (${updatedQuantity})` : 'Add to Cart';
    }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    console.log(`Removing product from cart: ID=${productId}`);
    cart = cart.filter(item => item.id !== productId);

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count and UI
    updateCartCount();
    updateCartUI();

    // Show notification
    showNotification(`Product removed from cart`);
}

// Populate the product grid on the homepage
function populateProducts() {
    console.log('Populating products...');
    const productGrid = document.getElementById('all-products');
    if (!productGrid) return;

    allProducts.slice(0, 4).forEach(product => {
        console.log(`Adding product: ${product.name}`);
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-id', product.id);

        const cartItem = cart.find(item => item.id === product.id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">${quantityInCart > 0 ? `Added (${quantityInCart})` : 'Add to Cart'}</button>
            ${quantityInCart > 0 ? `<button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>` : ''}
        `;
        productGrid.appendChild(productItem);

        const addToCartButton = productItem.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', () => {
            console.log(`Add to Cart clicked for product ID: ${product.id}`);
            addToCart(product.id, product.name, product.price);
        });

        const removeFromCartButton = productItem.querySelector('.remove-from-cart-btn');
        if (removeFromCartButton) {
            removeFromCartButton.addEventListener('click', () => {
                removeFromCart(product.id);

                // Update button text
                addToCartButton.innerText = 'Add to Cart';

                // Remove the "Remove" button
                removeFromCartButton.remove();
            });
        }
    });
}

// Redirect to checkout page when "Checkout" button is clicked
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});

// Redirect to Products Page when "Load More" is clicked
document.getElementById('load-more-btn')?.addEventListener('click', () => {
    window.location.href = 'products.html';
});

// Function to show a notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessageElement = document.getElementById('notification-message');
    if (notification && notificationMessageElement) {
        notificationMessageElement.innerText = message;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    }
}

// Call these functions on every page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    populateProducts();
    updateCartUI();
});

// Populate the cart page
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

        // Add event listeners to "Remove" buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeFromCart(productId);
            });
        });

        // Calculate and display total price
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }
}

// Call this function on page load
populateCart();

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

        console.log(`Adding product: ${productName}, ID: ${productId}`);
        addToCart(productId, productName, productPrice);
    });
});