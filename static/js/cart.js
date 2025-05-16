let cart = [];

// Load cart from sessionStorage
function loadCart() {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateOrderSummary();
}

// Add item to the cart
function addToCart(mealName, mealPrice) {
    const existingIndex = cart.findIndex(item => item.name === mealName);
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: mealName,
            price: mealPrice,
            quantity: 1
        });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`${mealName} added to your cart at TZS ${mealPrice.toFixed(2)}`);
    updateOrderSummary();
}

// Update cart summary
function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');
    const cartCount = document.getElementById('cart-count');

    orderList.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    cart.forEach((meal, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${meal.name} (x${meal.quantity}) - TZS ${(meal.price * meal.quantity).toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        orderList.appendChild(listItem);
        total += meal.price * meal.quantity;
        totalItems += meal.quantity;
    });

    orderTotal.textContent = total.toFixed(2);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateOrderSummary();
}

// Clear entire cart
function clearCart() {
    cart = [];
    sessionStorage.removeItem('cart');
    updateOrderSummary();
}

// Prevent order page access if cart is empty
function goToOrderPage() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding.");
        return;
    }
    window.location.href = "/order";  // Adjust path if needed
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', loadCart);
