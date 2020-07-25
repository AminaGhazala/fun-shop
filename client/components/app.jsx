import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    if (!product) console.error(`Invalid product: ${product}`);

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

  placeOrder(orderInfo) {
    if (!orderInfo) console.error(`Invalid orderInfo: ${orderInfo}`);

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${orderInfo.name}`, creditCard: `${orderInfo.creditCard}`, shippingAddress: `${orderInfo.shippingAddress}` })
    }).then(res => res.json())
      .then(data => this.setState({ cart: [], view: { name: 'catalog', params: {} } }))
      .catch(err => this.setState({ message: err.message }));
  }

  setView(name, params) {
    const newView = { name, params };
    this.setState({ view: newView });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getMainView(viewName) {
    if (viewName === 'catalog') {
      return <ProductList selectedView={this.setView} />;
    } else if (viewName === 'details') {
      return <ProductDetails selectedView={this.setView} viewParam={this.state.view.params} addToCart={this.addToCart} />;
    } else if (viewName === 'cart') {
      return <CartSummary selectedView={this.setView} cart={this.state.cart} />;
    } else if (viewName === 'checkout') {
      return <CheckoutForm selectedView={this.setView} cart={this.state.cart} placeOrder={this.placeOrder} />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Header title={'Wicked Sales'} cartItem={this.state.cart.length} selectedView={this.setView}/>
        {this.getMainView(this.state.view.name)}
      </div>
    );
  }
}
