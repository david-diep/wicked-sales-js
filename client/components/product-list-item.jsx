import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.setView('details', this.props.item.productId);
  }

  render() {

    const isMobile = window.innerWidth <= 500;
    const priceStr = this.props.item.price.toString();
    const price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);
    let colClass = 'col-3 m-3';
    if (isMobile) {
      colClass = 'col-10 m-1';
    }
    return (<>
      <div className={`list-item ${colClass}`} onClick={this.handleClick}>
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

export default ProductListItem;
