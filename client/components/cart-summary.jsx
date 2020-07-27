import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this);
  }

  backClick() {
    this.props.setView('catalog', {});
  }

  render() {
    let cartTotal = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      cartTotal += this.props.cart[i].price;
    }
    const totalStr = cartTotal.toString();
    const total = totalStr.slice(0, totalStr.length - 2) + '.' + totalStr.slice(totalStr.length - 2);
    return (<>
      <p className="back-text p-3" onClick={this.backClick}>&lt;Back to Catalog</p>
      <div className="container">
        <h2 className="ml-2">My Cart</h2>
        <div className="col justify-content-center">
          {this.props.cart.map((item, index) => (
            <CartSummaryItem key={index} item={item} />
          )
          )}
        </div>
        <h2 className="m-2">Item Total: ${total}</h2>
      </div>
    </>
    );
  }
}

export default CartSummary;
