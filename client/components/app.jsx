import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import OrderSummary from './order-summary';
import { Modal } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} }, cart: [], total: 0, order: {}, modal: true };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  setView(name, params = {}) {
    this.setState({ view: { name: name, params: params } });
  }

  componentDidMount() {
    this.getCartItems();
  }

  handleClose() {
    this.setState({
      modal: false
    });
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

  saveOrder(order) {
    this.setState({ order: order, view: { name: 'order', params: {} } });
  }

  placeOrder() {
    fetch('/api/orders/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.order) })
      .then(res => res.json())
      .then(result => {
        this.setState({ view: { name: 'catalog', params: {} }, cart: [], total: 0, order: {} });
      })
      .catch(err => console.error(err));
  }

  addToCart(productId, quantity = 1, overwrite = false) {
    let setQuantity = quantity;
    if (!overwrite) {
      const index = this.state.cart.findIndex(item => item.productId === productId);
      if (index >= 0) {
        setQuantity += this.state.cart[index].quantity;
      }
    }
    fetch('/api/cart/' + productId, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity: setQuantity }) })
      .then(res => {
        this.getCartItems();
      });
  }

  deleteFromCart(productId) {
    fetch('api/cart/' + productId, { method: 'DELETE' }).then(result => {
      const newCart = [...this.state.cart];
      const deleteIndex = newCart.findIndex(product => product.productId === productId);
      newCart.splice(deleteIndex, 1);
      let cartTotal = 0;
      for (let i = 0; i < newCart.length; i++) {
        cartTotal += newCart[i].price * newCart[i].quantity;
      }
      this.setState({ cart: newCart, total: cartTotal });
    });
  }

  render() {
    let renderView;
    let cartNum = 0;
    if (this.state.cart.length > 1) {
      cartNum = this.state.cart.reduce((acc, b) => {
        return acc + b.quantity;
      }, 0);
    } else if (this.state.cart.length === 1) {
      cartNum = this.state.cart[0].quantity;
    }

    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'details') {
      renderView = <ProductDetails productId={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      renderView = <CartSummary deleteFromCart={this.deleteFromCart} addToCart={this.addToCart} setView={this.setView} cart={this.state.cart} total={this.state.total}/>;
    } else if (this.state.view.name === 'checkout') {
      renderView = <CheckoutForm total={this.state.total} setView={this.setView} saveOrder={this.saveOrder}/>;
    } else if (this.state.view.name === 'order') {
      renderView = <OrderSummary order={this.state.order} total={this.state.total} setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart}/>;
    }
    return (<>
      <Header cartNum={cartNum} setView={this.setView}/>
      {renderView}
      <Modal show={this.state.modal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This isn&#39;t a real storefront, and all purchases are void. Please do not use your actual information!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={this.handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>);
  }
}
