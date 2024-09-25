let cart = [];

// Function to load the cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateOrderSummary();
    }
}

// Function to add items to the cart
function addToCart(mealName, mealPrice) {
    const meal = {
        name: mealName,
        price: mealPrice
    };

    cart.push(meal);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${mealName} has been added to your cart at ${mealPrice.toFixed(2)}`);
}

// Function to update the order summary
function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');

    orderList.innerHTML = ''; // Clear the list
    let total = 0;
    
    // Add each meal in the cart to the order summary
    cart.forEach(meal => {
        const listItem = document.createElement('li');
        listItem.textContent = `${meal.name} - TZS ${meal.price.toFixed(2)}`;
        orderList.appendChild(listItem);
        total += meal.price;
    });

    orderTotal.textContent = total.toFixed(2); // Update total
}

// Load the cart when the document is ready
document.addEventListener('DOMContentLoaded', loadCart);
