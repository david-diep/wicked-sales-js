import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products').then(res => res.json()
    ).then(products => this.setState({ products: products }));
  }

  render() {
    return (<>
      <div className="d-flex flex-wrap justify-content-center">
        {this.state.products.map(item => (
          <ProductListItem addToCart={this.props.addToCart} key={item.productId} item={item} setView={this.props.setView} />
        )
        )}
      </div>

    </>
    );
  }
}

export default ProductList;
