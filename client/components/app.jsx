import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} } };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  render() {
    let renderView;
    if (this.state.view.name === 'catalog') {
      renderView = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      renderView = <ProductDetails productId={this.state.view.params} setView={this.setView}/>;
    }
    return (<>
      <Header/>
      {renderView}
    </>);
  }
}
