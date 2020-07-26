import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.homeClick = this.backClick.bind(this);
  }

  homeclick() {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <header className="pl-3 bg-dark row justify-content-between">
        <h2 onClick={this.homeClick} className="m-3 text-light">
          <i className="fas fa-comment-dollar"></i>
          <a className="text-decoration-none text-reset" href="#"> Wicked <i className="fa fa-dollar-sign" aria-hidden="true"></i>ales</a>
        </h2>
        <div>
          <h5 className="mr-5 mt-4 text-light">{this.props.cartNum} Items <i className="fas fa-shopping-cart"></i>
          </h5>

        </div>
      </header>);
  }
}

export default Header;
