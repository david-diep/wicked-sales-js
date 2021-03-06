import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  handleClick(event) {
    this.props.setView('details', this.props.item.productId);
  }

  handleClickMinus() {
    this.setState(prevState => {
      if (prevState.count === 1) {
        return { count: 1 };
      }
      return { count: prevState.count - 1 };
    });
  }

  handleClickPlus() {
    this.setState(prevState => {
      return { count: prevState.count + 1 };
    });
  }

  handleChange(event) {
    this.setState({ count: parseInt(event.target.value) });
  }

  addToCart() {
    this.props.addToCart(this.props.item.productId, this.state.count);
  }

  render() {

    const priceStr = this.props.item.price.toString();
    const price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);

    return (<>
      <div className={'list-item col-lg-3 col-md-5 m-3 product-list-item'}>
        <div className="d-flex flex-column justify-content-between h-100">
          <div onClick={this.handleClick}>
            <div className="d-flex justify-content-center">
              <img className="item-picture p-2" src={this.props.item.image}></img>
            </div>
            <h3>{this.props.item.name}</h3>
            <p>${price}</p>
            <p>{this.props.item.shortDescription}</p>
          </div>
          <div className="row justify-content-between flex-wrap">
            <div className="input-group mb-2 px-2 w-35 flex flex-nowrap">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickMinus}>-</button>
              </div>
              <input type="number" className=" form-control text-center" value={this.state.count} onChange={this.handleChange} aria-label="" aria-describedby="basic-addon1" min="0"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickPlus}>+</button>
              </div>
            </div>
            <button onClick={this.addToCart} className="btn btn-outline-success mb-2 mx-2">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
    );
  }
}

export default ProductListItem;
