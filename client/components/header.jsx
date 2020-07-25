import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="pl-3 bg-dark row">
        <h2 className="m-3 text-light">
          <i className="fas fa-comment-dollar"></i>
          <a className="text-decoration-none text-reset" href="#"> Wicked <i className="fa fa-dollar-sign" aria-hidden="true"></i>ales</a>
        </h2>
      </header>);
  }
}

export default Header;
