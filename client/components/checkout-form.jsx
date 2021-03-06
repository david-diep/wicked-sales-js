import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', creditCard: '', shippingAddress: '', errorMessage: '' };
    this.handleName = this.handleName.bind(this);
    this.handleCC = this.handleCC.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.backClick = this.backClick.bind(this);
  }

  backClick() {
    this.props.setView('catalog', {});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.shippingAddress && this.state.creditCard) {
      const order = { name: this.state.name, creditCard: this.state.creditCard, shippingAddress: this.state.shippingAddress };
      this.props.saveOrder(order);
    } else {
      this.setState({ errorMessage: 'Cannot fulfill order without complete form.' });
    }
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleCC(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleAddress(event) {
    this.setState({ shippingAddress: event.target.value });
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

      <form className="container">
        <h2 className="mt-4">Checkout</h2>
        <p className="text-danger">Important: Do not use your real information. This isn&apos;t a real commerce site.</p>
        <h4 className="text-secondary">Order Total: ${total}</h4>
        <div className="form-group">
          <label htmlFor="name-line">Name</label>
          <input onChange={this.handleName} value={this.state.name} className="form-control" id="name-line"></input>
        </div>
        <div className="form-group">
          <label htmlFor="cc-line">Credit Card</label>
          <input onChange={this.handleCC} value={this.state.creditCard} className="form-control" id="cc-line" ></input>
        </div>
        <div className="form-group">
          <label htmlFor="address-line">Shipping Address</label>
          <textarea onChange={this.handleAddress} value={this.state.shippingAddress} className="form-control" id="address-line" rows="4"></textarea>
        </div>
        <p className="text-center text-danger">{this.state.errorMessage}</p>
        <div className="row justify-content-between align-items-center">
          <p className="back-text p-3" onClick={this.backClick}>&lt;Continue Shopping</p>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Go to Order Summary</button>
        </div>
      </form>

    </>);
  }
}

export default CheckoutForm;
