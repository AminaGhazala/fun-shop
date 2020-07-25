import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(event) {
    this.props.selectedView('catalog', {});
  }

  getTotalPrice() {
    const totalPrice = this.props.cart.reduce((acc, cur) => parseInt(acc) + parseInt(cur.price), 0);
    if (totalPrice === 0) return null;

    const priceLength = totalPrice.toString().length;
    return 'Item Total $' + totalPrice.toString().substr(0, priceLength - 2) + '.' + totalPrice.toString().substr(priceLength - 2);
  }

  render() {
    const cartSummaryMenu = (
      <div className="row justify-content-center">
        <div className="col" style={{ cursor: 'pointer' }} onClick={this.handleBack} >
          <p className="text-muted py-4 m-0">&lt; Back to catalog</p>
        </div>
      </div>
    );

    const cartSummaryTitle = (
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="pb-4 m-0">My Cart</h1>
        </div>
      </div>
    );

    const cartSummaryItem = (
      this.props.cart.length === 0
        ? <h3 className="pb-4 m-0">Shopping cart is empty.</h3>
        : this.props.cart.map((item, index) => (
          <CartSummaryItem product={item} key={index}/>
        ))
    );

    const cartSummaryTotal = (
      <div className="row justify-content-center">
        <div className="col">
          <h3 className="m-0">{this.getTotalPrice()}</h3>
        </div>
      </div>
    );

    return (
      <div className="cart-summary-container m-5 px-4" style={{ maxWidth: '97vw' }}>
        {cartSummaryMenu}
        {cartSummaryTitle}
        {cartSummaryItem}
        {cartSummaryTotal}
      </div>
    );
  }
}
