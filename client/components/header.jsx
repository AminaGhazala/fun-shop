import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickCart = this.handleClickCart.bind(this);
  }

  handleClickCart(event) {
    this.props.selectedView('cart', {});
  }

  render() {
    const cartItemTitle = this.props.cartItem === 1 ? '1 Item' : `${this.props.cartItem} Items`;
    return (
      <div className="shadow-lg bg-dark text-white d-flex justify-content-between align-items-center p-3 px-5">
        <h2 className="d-inline-block"><i className="fas fa-dollar-sign pr-2"></i>{this.props.title}</h2>
        <h5 className="d-inline-block" style={{ cursor: 'pointer' }} onClick={this.handleClickCart}>{cartItemTitle} <i className="fas fa-shopping-cart pl-2"></i></h5>
      </div>
    );
  }
}
