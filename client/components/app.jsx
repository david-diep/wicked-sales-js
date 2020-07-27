import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} }, cart: [] };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart').then(res => res.json()).then(cart => this.setState({ cart: cart })).catch(err => console.error(err));
  }

  addToCart(productId) {
    fetch('/api/cart/' + productId, { method: 'POST' })
      .then(res => res.json())
      .then(cartItem => {
        const newCart = [...this.state.cart];
        newCart.push({ cartItem: cartItem });
        this.setState({ cart: newCart });
      });
  }

  render() {
    let renderView;
    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      renderView = <ProductDetails productId={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      renderView = <CartSummary setView={this.setView} cart={this.state.cart}/>;
    }
    return (<>
      <Header cartNum={this.state.cart.length} setView={this.setView}/>
      {renderView}
    </>);
  }
}
