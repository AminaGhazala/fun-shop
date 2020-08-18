import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
  }

  handleBack() {
    this.props.selectedView('catalog', {});
  }

  handleClickCheckout() {
    this.props.selectedView('checkout', {});
  }

  getTotalPrice() {
    const totalPrice = this.props.cart.reduce((acc, cur) => parseInt(acc) + parseInt(cur.price), 0);
    if (totalPrice === 0) return 'Item Total: 0';

    const priceLength = totalPrice.toString().length;
    return 'Item Total: $' + totalPrice.toString().substr(0, priceLength - 2) + '.' + totalPrice.toString().substr(priceLength - 2);
  }

  render() {
    const cartSummaryMenu = (
      <div className="row">
        <div className="col" style={{ cursor: 'pointer' }} onClick={this.handleBack} >
          <p className="text-muted">&lt; Back to catalog</p>
        </div>
      </div>
    );

    const cartSummaryTitle = (
      <div className="row">
        <div className="col">
          <h1 className="py-2">My Cart</h1>
        </div>
      </div>
    );

    const cartSummaryItem = (
      this.props.cart.length === 0
        ? <h3 className="pb-2">Shopping cart is empty.</h3>
        : this.props.cart.map((item, index) => (
          <CartSummaryItem product={item} key={index}/>
        ))
    );

    const cartSummaryFooter = (
      this.props.cart.length === 0
        ? null
        : <div className="d-flex justify-content-between">
          <h3 className="m-0">{this.getTotalPrice()}</h3>
          <button type="button" className="btn btn-primary" onClick={this.handleClickCheckout}>Checkout</button>
        </div>
    );

    return (
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='cart-summary-container mt-3'>
          {cartSummaryMenu}
          {cartSummaryTitle}
          {cartSummaryItem}
          {cartSummaryFooter}
        </div>
      </div>
    );
  }
}
