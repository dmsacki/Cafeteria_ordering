from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'dodo'

# In-memory storage for orders (resets on server restart)
orders = []

# Homepage
@app.route('/')
def index():
    return render_template('index.html')

# Menu page
@app.route('/menu')
def menu():
    cart = session.get('cart', [])
    return render_template('menu.html', cart=cart)

# Add item to cart
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    item = request.form['item']
    if 'cart' not in session:
        session['cart'] = []
    session['cart'].append(item)
    session.modified = True
    return redirect(url_for('menu'))

# Order page
@app.route('/order')
def order():
    cart = session.get('cart', [])
    return render_template('order.html', cart=cart)

# Place order
@app.route('/place_order', methods=['POST'])
def place_order():
    name = request.form['name']
    phone = request.form['phone']
    pickup_method = request.form['pickup_method']
    payment_method = request.form['payment_method']
    items = session.get('cart', [])

    items_str = ', '.join(items) if items else 'None'

    # Create order dict and save in memory
    order = {
        'name': name,
        'phone': phone,
        'pickup_method': pickup_method,
        'payment_method': payment_method,
        'items': items_str,
        'status': 'Order Received'
    }
    orders.append(order)

    session.pop('cart', None)  # Clear cart
    session['latest_phone'] = phone  # Save latest phone in session

    return redirect(url_for('order_status'))

# Order status (uses session to fetch latest order)
@app.route('/order_status')
def order_status():
    phone = session.get('latest_phone')
    if not phone:
        return "No recent order found", 400

    # Get the most recent order for this phone number
    order = next((o for o in reversed(orders) if o['phone'] == phone), None)
    if order:
        return render_template('order_status.html', order=order)
    else:
        return "Order not found", 404

# Admin view - all orders
@app.route('/all_orders')
def all_orders():
    return render_template('all_orders.html', orders=orders)

if __name__ == "__main__":
    app.run(debug=True)
