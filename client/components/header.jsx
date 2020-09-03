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
      <header className="pl-3 bg-purple row justify-content-between justify-content-end-sm flex-nowrap">
        <h2 onClick={this.homeClick} className="p-3 text-light header-title">
          <i className="fab fa-pagelines" aria-hidden="true"></i> Wicked Sales
        </h2>

        <h5 onClick={this.cartClick} className="mx-lg-3 mt-2 pr-3 text-light cart">{this.props.cartNum} Items <i className="fas fa-shopping-cart"></i>
        </h5>

      </header>);
  }
}

export default Header;
