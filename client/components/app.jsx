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
      view: { name: 'catalog', params: {} },
      cart: {}
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: `${product.productId}` })
    }).then(res => res.json())
      .then(data => this.getCartItems())
      .catch(err => this.setState({ message: err.message }));
  }

  setView(name, params) {
    const newView = { name, params };
    this.setState({ view: newView });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    const productView = this.state.view.name === 'catalog'
      ? <ProductList selectedView={this.setView} />
      : <ProductDetails selectedView={this.setView} viewParam={this.state.view.params} addToCart={this.addToCart}/>;

    return (
      <div>
        <Header title={'Wicked Sales'} cartItem={this.state.cart.length}/>
        {productView}
      </div>
    );
  }
}
