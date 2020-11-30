import React from 'react';
import OrderSummaryItem from './order-summary-item';

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  backClick() {
    this.props.setView('checkout', {});
  }

  submitOrder() {
    this.props.placeOrder();
  }

  render() {
    let total;
    if (this.props.total === 0) {
      total = 0;
    } else {
      const totalStr = this.props.total.toString();
      total = totalStr.slice(0, totalStr.length - 2) + '.' + totalStr.slice(totalStr.length - 2);
    }

    return (<>
      <p className="back-text p-3" onClick={this.backClick}>&lt;Back to Checkout</p>
      <div className="container">
        <h2 className="mb-2">Order Details</h2>
        <div className="summary-item row p-2 m-2 top-order-row">
          <div className="m-2">
            <h4>Name</h4>
            <p>{this.props.order.name}</p>
          </div>
          <div className="m-2">
            <h4>Credit Card Number</h4>
            <p>{this.props.order.creditCard}</p>
          </div>
          <div className="m-2">
            <h4>Address</h4>
            <p>{this.props.order.shippingAddress}</p>
          </div>
        </div>
        <h5 className='m-3'>Items</h5>
        <div className="col justify-content-center">
          {this.props.cart.map((item, index) => (
            <OrderSummaryItem addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} key={index} item={item} />
          )
          )}
        </div >
        <div className="row bottom-cart-row align-items-center">
          <h2 className="m-2">Order Total: ${total}</h2>
          <button onClick={this.submitOrder} className="btn btn-primary mb-2 mr-2">Place Order</button>
        </div>
      </div>
    </>
    );
  }
}

export default OrderSummary;
