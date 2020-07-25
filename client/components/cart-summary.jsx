import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const tatalAmount = 'Item Total';
    const cartSummaryMenu = (
      <div className="row justify-content-center">
        <div className="col" style={{ cursor: 'pointer' }} onClick={this.handleBack} >
          <p className="text-muted p-4 m-0">&lt; Back to catalog</p>
        </div>
      </div>
    );

    const cartSummaryTitle = (
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="m-0">My Cart</h1>
        </div>
      </div>
    );

    const cartSummaryItem = (
      <CartSummaryItem />
    );

    const cartSummaryTotal = (
      <div className="row justify-content-center">
        <div className="col">
          <h3 className="m-0">{tatalAmount}</h3>
        </div>
      </div>
    );

    return (
      <div className="cart-summary-container card m-5" style={{ maxWidth: '97vw' }}>
        {cartSummaryMenu}
        {cartSummaryTitle}
        {cartSummaryItem}
        {cartSummaryTotal}
      </div>
    );
  }
}
