import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    const newView = { name, params: { productId: params } };
    this.setState({ view: newView });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const productView = this.state.view.name === 'catalog'
      ? <ProductList selectedView={this.setView} />
      : <ProductDetails selectedView={this.setView} viewParam={this.state.view.params}/>;

    return (
      <div>
        <Header title={'$ Wicked Sales'}/>
        {productView}
      </div>
    );
  }
}
