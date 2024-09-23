from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/order')
def order():
    return render_template('order.html')

if __name__ == "__main__":
    app.run()
from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Store orders in a simple list for now (you can replace this with a database)
orders = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/order')
def order():
    return render_template('order.html')

# Handle the order placement
@app.route('/place_order', methods=['POST'])
def place_order():
    name = request.form['name']
    phone = request.form['phone']
    pickup_method = request.form['pickup_method']
    payment_method = request.form['payment_method']
    
    order = {
        'name': name,
        'phone': phone,
        'pickup_method': pickup_method,
        'payment_method': payment_method,
        'status': 'Order Received'  # Initial order status
    }
    
    orders.append(order)
    return redirect(url_for('order_status', phone=phone))

@app.route('/order_status/<phone>')
def order_status(phone):
    # Find the order by phone number
    order = next((order for order in orders if order['phone'] == phone), None)
    if order:
        return render_template('order_status.html', order=order)
    else:
        return "Order not found", 404

if __name__ == "__main__":
    app.run(debug=True)
