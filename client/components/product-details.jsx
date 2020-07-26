import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, price: '' };
    this.backClick = this.backClick.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  componentDidMount() {
    this.getProduct();

  }

  getProduct() {
    const fetchLink = '/api/products/' + this.props.productId;
    fetch(fetchLink).then(res => res.json()
    ).then(product => {
      const priceStr = product.price.toString();
      const price = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(priceStr.length - 2);
      this.setState({ product: product, price: price });
    });
  }

  backClick() {
    this.props.setView('catalog', {});
  }

  handleAddCart() {
    this.props.addToCart(this.state.product.productId);
  }

  render() {
    if (this.state.product === null) {
      return (
        <h1>Loading...</h1>
      );
    } else {
      return (
        <div className="container mt-3 product-details">

          <p className="back-text p-3" onClick={this.backClick}>&lt;Back to Catalog</p>
          <div className="row">
            <img className="detail-image" src={this.state.product.image}></img>
            <div className="col">
              <h3>{this.state.product.name}</h3>
              <p>${this.state.price}</p>
              <p>{this.state.product.shortDescription}</p>
              <button className="btn btn-primary" onClick={this.handleAddCart}>Add to Cart</button>
            </div>
          </div>
          <div className="p-3">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>

      );
    }
  }
}

export default ProductDetails;
