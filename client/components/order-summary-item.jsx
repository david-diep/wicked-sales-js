import React from 'react';

class OrderSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: false });
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
      <div className="summary-item row p-3 m-2 order-item-row">

        <img className="summary-img" src={this.props.item.image}></img>
        <div className="w-35 mx-1">
          <h3>{this.props.item.name}</h3>
          <p>${price}</p>
          <p>{this.props.item.shortDescription}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h5 className="mb-2">Quantity</h5>
          <p className="w-25 text-center">{this.props.item.quantity}</p>
        </div>
        <div className="d-flex flex-column align-items-center px-3">
          <h5 className="mb-2">Total Price</h5>
          <p>${totalPrice}</p>
        </div>
      </div>
    </>
    );
  }
}

export default OrderSummaryItem;
