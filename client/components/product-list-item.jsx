import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    this.props.setView('details', this.props.item.productId);
  }

  handleClickMinus() {
    this.setState(prevState => {
      if (prevState.count === 0) {
        return { count: 0 };
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

  render() {

    const isMobile = window.innerWidth <= 500;
    const priceStr = this.props.item.price.toString();
    const price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);
    let colClass = 'col-3 m-3';
    if (isMobile) {
      colClass = 'col-10 m-1';
    }
    return (<>
      <div className={`list-item ${colClass}`}>
        <div onClick={this.handleClick}>
          <div className="d-flex justify-content-center">
            <img className="item-picture p-2" src={this.props.item.image}></img>
          </div>
          <h3>{this.props.item.name}</h3>
          <p>${price}</p>
          <p>{this.props.item.shortDescription}</p>
        </div>
        <div className="row justify-content-between ">
          <div className="input-group mb-2 ml-2 w-50">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickMinus}>-</button>
            </div>
            <input type="text" className=" form-control text-center" value={this.state.count} onChange={this.handleChange} aria-label="" aria-describedby="basic-addon1"></input>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickPlus}>+</button>
            </div>
          </div>
          <button className="btn btn-outline-success mb-2 mr-2">Add to Cart</button>
        </div>
      </div>
    </>
    );
  }
}

export default ProductListItem;
