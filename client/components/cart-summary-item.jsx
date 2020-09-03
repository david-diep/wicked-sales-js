import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, loading: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ count: this.props.item.quantity, loading: false });
  }

  handleDelete() {
    this.props.deleteFromCart(this.props.item.productId);
  }

  handleChange() {

    var newQuantity = parseInt(event.target.value);
    if (newQuantity === 0) {
      this.props.deleteFromCart(this.props.item.productId);

    } else {
      this.setState({ count: newQuantity });
      this.props.addToCart(this.props.item.productId, newQuantity, true);
    }

  }

  render() {
    let priceStr = '';
    let price = 0;
    let totalPriceStr = '';
    let totalPrice = 0;
    if (!this.state.loading) {
      priceStr = this.props.item.price.toString();
      price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);
      totalPriceStr = (this.props.item.price * this.props.item.quantity).toString();
      totalPrice = totalPriceStr.slice(0, totalPriceStr.length - 2) + '.' + totalPriceStr.slice(totalPriceStr.length - 2);
    }

    return (<>
      <div className="summary-item row p-3 m-2 justify-content-lg-between">

        <img className="summary-img" src={this.props.item.image}></img>
        <div className="w-35 mx-1">
          <h3>{this.props.item.name}</h3>
          <p>${price}</p>
          <p>{this.props.item.shortDescription}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h5 className="mb-2">Quantity</h5>
          <input type="number" className="w-25 form-control text-center" value={this.state.count} onChange={this.handleChange} min="0"></input>
          <button className="btn btn-danger mt-2" onClick={this.handleDelete}>Remove from Cart</button>
        </div>
        <div className="d-flex flex-column align-items-center pt-3">
          <h5 className="mb-2">Total Price</h5>
          <p>${totalPrice}</p>
        </div>
      </div>
    </>
    );
  }
}

export default CartSummaryItem;
