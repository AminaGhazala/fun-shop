import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickCart = this.handleClickCart.bind(this);
  }

  handleClickBack(event) {
    this.props.selectedView('catalog', {});
  }

  handleClickCart(event) {
    this.props.selectedView('cart', {});
  }

  render() {
    const cartItemTitle = this.props.cartItem === 1 ? '1 Item' : `${this.props.cartItem} Items`;
    return (
      <header className='shadow bg-info text-white sticky-top'>
        <div className='container header-container d-flex justify-content-between align-items-center px-3 px-sm-0'>
          <div className='d-inline-flex pt-2'>
            <h4 className='header-font pt-1' style={{ cursor: 'pointer' }} onClick={this.handleClickBack}>
              {this.props.title}
            </h4>
          </div>
          <div>
            <h6 className='m-0' style={{ cursor: 'pointer' }} onClick={this.handleClickCart}>
              {cartItemTitle} <i className='fas fa-shopping-cart'></i>
            </h6>
          </div>
        </div>
      </header>
    );
  }
}
