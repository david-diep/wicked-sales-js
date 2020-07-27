import React from 'react';

class CartSummaryItem extends React.Component {

  render() {

    var priceStr = this.props.item.price.toString();
    var price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);

    return (<>
      <div className="summary-item row p-3 m-2">

        <img className="summary-img" src={this.props.item.image}></img>
        <div className="col">
          <h3>{this.props.item.name}</h3>
          <p>${price}</p>
          <p>{this.props.item.shortDescription}</p>
        </div>
      </div>
    </>
    );
  }
}

export default CartSummaryItem;
