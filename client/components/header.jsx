import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.homeClick = this.homeClick.bind(this);
    this.cartClick = this.cartClick.bind(this);
  }

  homeClick() {
    this.props.setView('catalog', {});
  }

  cartClick() {
    this.props.setView('cart', {});
  }

  render() {
    return (
      <header className="px-2 bg-purple d-flex justify-content-between justify-content-end-sm flex-nowrap">
        <h2 onClick={this.homeClick} className="py-2 text-light header-title">
          <i className="fab fa-pagelines" aria-hidden="true"></i> Wild Plushies
        </h2>

        <h5 onClick={this.cartClick} className="pt-3 pr-2 text-light cart">{this.props.cartNum} Items <i className="fas fa-shopping-cart"></i>
        </h5>

      </header>);
  }
}

export default Header;
