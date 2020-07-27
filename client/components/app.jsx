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
        cartTotal += cart[i].price;
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

  addToCart(productId) {
    fetch('/api/cart/' + productId, { method: 'POST' })
      .then(res => res.json())
      .then(cartItem => {
        const newCart = [...this.state.cart];
        newCart.push({ cartItem: cartItem });
        const newTotal = this.state.total + cartItem.price;
        this.setState({ cart: newCart, total: newTotal });
      });
  }

  render() {
    let renderView;
    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      renderView = <ProductDetails productId={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      renderView = <CartSummary setView={this.setView} cart={this.state.cart} total={this.state.total}/>;
    } else if (this.state.view.name === 'checkout') {
      renderView = <CheckoutForm total={this.state.total} setView={this.setView} placeOrder={this.placeOrder}/>;
    }
    return (<>
      <Header cartNum={this.state.cart.length} setView={this.setView}/>
      {renderView}
    </>);
  }
}
