
// List of all products
const allProducts = [
    { id: "1", name: "Wireless Headphones", price: 99.99, image: "images/headset.webp" },
    { id: "2", name: "Gaming Mouse", price: 49.99, image: "images/mouse.jpg" },
    { id: "3", name: "Smartwatch Pro", price: 149.99, image: "images/watch.webp" },
    { id: "4", name: "Laptop Stand", price: 29.99, image: "images/laptopstand.jpg" },
    { id: "5", name: "Bluetooth Speaker", price: 79.99, image: "images/blutooth_speakers.jpg" },
    { id: "6", name: "External SSD", price: 129.99, image: "images/ssd.jpg" },
    { id: "7", name: "Webcam HD", price: 89.99, image: "images/webcamhd.jpg" },
    { id: "8", name: "Keyboard Mechanical", price: 119.99, image: "images/keyboard_mechanical.webp" },
    { id: "9", name: "Wireless Earbuds Pro", price: 79.99, image: "images/wireless-earbuds-pro.webp" },
    { id: "10", name: "4K Ultra HD Webcam", price: 109.99, image: "images/4K Ultra HD Webcam.jpg" },
    { id: "11", name: "Portable Power Bank (20000mAh)", price: 49.99, image: "images/Portable Power Bank (20000mAh).avif" },
    { id: "12", name: "Ergonomic Office Chair", price: 199.99, image: "images/Ergonomic Office Chair.webp" },
    { id: "13", name: "Noise-Canceling Headphones", price: 149.99, image: "images/Noise-Canceling Headphones.jpeg" },
    { id: "14", name: "Mechanical Keyboard (RGB)", price: 89.99, image: "images/Mechanical Keyboard (RGB).webp" },
    { id: "15", name: "Smart Home Security Camera", price: 129.99, image: "images/Smart Home Security Camera.jpg" },
    { id: "16", name: "Fitness Tracker Watch", price: 59.99, image: "images/Fitness Tracker Watch.jpg" },
    { id: "17", name: "Laptop Cooling Pad", price: 39.99, image: "images/Laptop Cooling Pad.jpg" },
    { id: "18", name: "Bluetooth Car Kit", price: 29.99, image: "images/Bluetooth Car Kit.webp" },
    { id: "19", name: "Gaming Mousepad (XL)", price: 19.99, image: "images/Gaming Mousepad (XL).webp" },
    { id: "20", name: "32GB USB Flash Drive", price: 14.99, image: "images/32GB USB Flash Drive.webp" },
];

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate the product grid
function populateProducts(filteredProducts = allProducts) {
    const productGrid = document.getElementById('all-products');
    productGrid.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-id', product.id);
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
        productGrid.appendChild(productItem);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

            // Add product to cart
            addToCart(productId, productName, productPrice);
        });
    });
}

// Function to filter products based on search input
function filterProducts(searchTerm) {
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    populateProducts(filteredProducts); // Repopulate the product grid with filtered results
}

// Event listener for search input
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        filterProducts(searchTerm); // Filter products if there's a search term
    } else {
        populateProducts(allProducts); // Show all products if the search bar is empty
    }
});

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
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

    // Show notification
    showNotification(`${productName} added to cart`);
}

// Function to update the cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.innerText = totalQuantity;
    }
}

// Function to show a notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessageElement = document.getElementById('notification-message');

    // Set the notification message
    notificationMessageElement.innerText = message;

    // Show the notification
    notification.classList.remove('hidden');

    // Hide the notification after 2 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}

// Populate products and update cart count on page load
populateProducts();
updateCartCount();