import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
    this.backClick = this.backClick.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  backClick() {
    this.setState = { errorMessage: '' };
    this.props.setView('catalog', {});
  }

  checkout() {
    if (this.props.cart.length > 0) {
      this.setState({ errorMessage: '' });
      this.props.setView('checkout', {});
    } else {
      this.setState({ errorMessage: 'Cannot checkout with an empty cart.' });
    }
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
            <CartSummaryItem addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} key={index} item={item} />
          )
          )}
          <p className="text-center text-danger">{this.state.errorMessage}</p>
        </div >
        <div className="row align-items-center bottom-cart-row">
          <h2 className="m-2">Cart Total: ${total}</h2>
          <button onClick={this.checkout} className="btn btn-primary m-2">Go to Checkout</button>
        </div>
      </div>
    </>
    );
  }
}

export default CartSummary;
