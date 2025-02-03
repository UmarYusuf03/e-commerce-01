
// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');
const checkoutCartItems = document.getElementById('checkout-cart-items');
const checkoutTotalPrice = document.getElementById('checkout-total-price');

// Initialize EmailJS with your User ID
emailjs.init('b2dP2QUIS1VWIGClU'); // Replace with your actual EmailJS User ID

// Update cart count
function updateCartCount() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.innerText = totalQuantity;
    }
}

// Populate checkout cart items
function populateCheckoutCart() {
    if (cart.length === 0) {
        checkoutCartItems.innerHTML = '<p>Your cart is empty.</p>';
        checkoutTotalPrice.innerText = '0.00';
    } else {
        checkoutCartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            checkoutCartItems.appendChild(cartItem);
        });
        checkoutTotalPrice.innerText = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
}

// Initial population of cart and cart count
populateCheckoutCart();
updateCartCount();

// Handle form submission when "Place Order" is clicked
document.getElementById('place-order-btn').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the cart is empty
    if (cart.length === 0) {
        showNotification("Your cart is empty! Please add items to your cart before placing an order.", 'error');
        return;
    }

    // Validate shipping details
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const payment = document.getElementById('payment').value;

    // Check for missing fields
    if (!name || !email || !address || !city || !zip || !payment) {
        showNotification("Please fill in all shipping details before placing your order.", 'error');
        return;
    }

    // Prepare order details for the email
    const orderDetails = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // Send confirmation email using EmailJS
    try {
        await emailjs.send('service_x068hcj', 'template_u6v9q0t', {
            name: name,
            email: email,
            order_details: orderDetails,
            total_price: totalPrice
        });

        // Show success modal
        document.getElementById('success-modal').style.display = 'flex';

        // Clear cart data from localStorage
        localStorage.removeItem('cart');

        // Reset the cart variable and update the cart count
        cart = [];
        updateCartCount();

        showNotification("Order placed successfully! A confirmation email has been sent.", 'success');
    } catch (error) {
        console.error('Error sending email:', error);
        showNotification("There was an issue sending the confirmation email. Please try again later.", 'error');
    }
});

// Close modal and redirect to home page
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('success-modal').style.display = 'none';
    window.location.href = 'index.html';
});

// Function to show a notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessageElement = document.getElementById('notification-message');

    // Set the notification message
    notificationMessageElement.innerText = message;

    // Apply styles based on the notification type
    if (type === 'error') {
        notification.style.backgroundColor = '#FF5252'; // Red for errors
    } else {
        notification.style.backgroundColor = '#4CAF50'; // Green for success
    }

    // Show the notification
    notification.classList.remove('hidden');

    // Hide the notification after 2 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}