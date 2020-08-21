import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} }, cart: [], total: 0 };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart').then(res => res.json()).then(cart => {
      let cartTotal = 0;
      for (let i = 0; i < cart.length; i++) {
        cartTotal += cart[i].price * cart[i].quantity;
      }
      this.setState({ cart: cart, total: cartTotal });
    }).catch(err => console.error(err));
  }

  placeOrder(order) {
    fetch('/api/orders/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
      .then(res => res.json())
      .then(result => {
        this.setState({ view: { name: 'catalog', params: {} }, cart: [], total: 0 });
      })
      .catch(err => console.error(err));
  }

  addToCart(productId, quantity = 1) {
    fetch('/api/cart/' + productId, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity: quantity }) })
      .then(res => res.json())
      .then(cartItem => {
        this.getCartItems();
        // const newCart = [...this.state.cart];
        // newCart.push({ cartItem: cartItem });
        // const newTotal = this.state.total + cartItem.price * cartItem.quantity;
        // this.setState({ cart: newCart, total: newTotal });
      });
  }

  deleteFromCart(productId) {
    fetch('api/cart/' + productId, { method: 'DELETE' }).then(() => {
      const newCart = [...this.state.cart];
      const deleteIndex = newCart.findIndex(product => product.productId === productId);
      newCart.splice(deleteIndex, 1);
      this.setState({ cart: newCart });
    });
  }

  render() {
    let renderView;
    let cartNum = 0;
    if (this.state.cart.length > 1) {
      cartNum = this.state.cart.reduce((a, b) => a.quantity + b.quantity);
    } else if (this.state.cart.length === 1) {
      cartNum = this.state.cart[0].quantity;
    }

    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'details') {
      renderView = <ProductDetails productId={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      renderView = <CartSummary addToCart={this.addToCart} setView={this.setView} cart={this.state.cart} total={this.state.total}/>;
    } else if (this.state.view.name === 'checkout') {
      renderView = <CheckoutForm total={this.state.total} setView={this.setView} placeOrder={this.placeOrder}/>;
    }
    return (<>
      <Header cartNum={cartNum} setView={this.setView}/>
      {renderView}
    </>);
  }
}
