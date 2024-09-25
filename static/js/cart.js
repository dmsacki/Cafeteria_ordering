let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function displayCart() {
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');
    
    orderList.innerHTML = '';  // Clear the order list
    total = 0;

    cart.forEach((meal, index) => {
        const li = document.createElement('li');
        li.textContent = meal.name + ' - ' + meal.price + ' TZS';
        orderList.appendChild(li);
        
        total += parseFloat(meal.price);
    });
    
    orderTotal.textContent = total.toFixed(2);
}

function addToCart(mealName, mealPrice) {
    const meal = { name: mealName, price: mealPrice };
    cart.push(meal);
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to local storage
    alert(mealName + " has been added to your cart!");
    displayCart();  // Update order summary
}

// Clear the cart after placing the order
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
}

// Call this function when the form is submitted
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Place the order via AJAX or form submission
    // If using AJAX, ensure that the order is successful before clearing the cart
    clearCart();
    alert("Your order has been placed successfully!");

    // Optionally redirect to the order status page
    window.location.href = '/order_status';
});

window.onload = displayCart;  // Load the cart when the page is opened
