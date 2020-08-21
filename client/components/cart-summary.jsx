import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  backClick() {
    this.props.setView('catalog', {});
  }

  checkout() {
    this.props.setView('checkout', {});
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
      <p className="back-text p-3" onClick={this.backClick}>&lt;Back to Catalog</p>
      <div className="container">
        <h2>My Cart</h2>
        <div className="col justify-content-center">
          {this.props.cart.map((item, index) => (
            <CartSummaryItem addToCart={this.props.addToCart} key={index} item={item} />
          )
          )}
        </div >
        <div className="row justify-content-between align-items-center">
          <h2 className="m-2">Cart Total: ${total}</h2>
          <button onClick={this.checkout} className="btn btn-primary">Go to Checkout</button>
        </div>
      </div>
    </>
    );
  }
}

export default CartSummary;
