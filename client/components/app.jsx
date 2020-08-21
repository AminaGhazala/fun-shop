import React from 'react';
import Header from './header';
import NewProductList from './new-product-list';
import PopularList from './popular-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Welcome from './welcome';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: [],
      welcomeVisible: 'modal-show',
      welcomeModalAnim: 'fade-in'
    };
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(productId) {
    const id = parseInt(productId);
    if (isNaN(id)) {
      return console.error(`Invalid product: ${id}`);
    }

    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: `${id}` })
    })
      .then(res => res.json())
      .then(data => this.getCartItems())
      .catch(err => this.setState({ message: err.message }));
  }

  placeOrder(orderInfo) {
    if (!orderInfo) return console.error(`Invalid orderInfo: ${orderInfo}`);
    const {
      firstName,
      lastName,
      address,
      address2,
      zipcode,
      city,
      state,
      phone,
      cardNumber,
      cardSecurityCode,
      cardExpMonth,
      cardExpYear
    } = orderInfo;

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        address2,
        zipcode,
        city,
        state,
        phone,
        cardNumber,
        cardSecurityCode,
        cardExpMonth,
        cardExpYear
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: [], view: { name: 'catalog', params: {} } }))
      .catch(err => this.setState({ message: err.message }));
  }

  setView(name, params) {
    const newView = { name, params };
    this.setState({ view: newView });
  }

  hideModal() {
    this.setState({ welcomeModalAnim: 'fade-out' });
    setTimeout(() => {
      this.setState({ welcomeVisible: 'modal-none' });
    }, 1000);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getMainView(viewName) {
    if (viewName === 'catalog') {
      return (
        <>
          <NewProductList selectedView={this.setView} addToCart={this.addToCart} />
          <PopularList selectedView={this.setView} addToCart={this.addToCart} />
        </>
      );
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
        <Header title={'Fun Shop'} cart={this.state.cart} selectedView={this.setView} />
        {this.getMainView(this.state.view.name)}
        <Welcome accept={this.hideModal} show={this.state.welcomeVisible} anim={this.state.welcomeModalAnim} />;
      </div>
    );
  }
}
