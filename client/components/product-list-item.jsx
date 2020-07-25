import React from 'react';

class ProductListitem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.setView('details', this.props.item.productId);
  }

  render() {

    var priceStr = this.props.item.price.toString();
    var price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);

    return (<>
      <div className="list-item col-3 m-3" onClick={this.handleClick}>
        <div className="d-flex justify-content-center">
          <img className="item-picture p-2" src={this.props.item.image}></img>
        </div>
        <h3>{this.props.item.name}</h3>
        <p>${price}</p>
        <p>{this.props.item.shortDescription}</p>
      </div>
    </>
    );
  }
}

export default ProductListitem;
