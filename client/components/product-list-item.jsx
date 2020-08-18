import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickCart = this.handleClickCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClickCart(event) {
    this.props.addToCart(event.currentTarget.parentNode.id);
  }

  handleClick(event) {
    const param = { productId: parseInt(event.currentTarget.id) };
    this.props.selectedView('details', param);
  }

  render() {
    return (
      <div className='product-list-item card col-lg-4 col-sm-6 mb-4 border-0 hvr-grow hvr-underline-from-center' style={{ cursor: 'pointer' }}>
        <img
          src={this.props.item.image}
          className='card-img-top'
          alt={this.props.item.name}
          style={{ height: '250px', objectFit: 'contain' }}
          id={this.props.item.productId}
          onClick={this.handleClick}
        />
        <div className='card-body pb-0 px-3' id={this.props.item.productId} onClick={this.handleClick}>
          <h6 className='card-title m-0 text-truncate text-wrap' style={{ minHeight: '40px' }}>
            <b>{this.props.item.name}</b>
          </h6>
          <p className='card-text text-muted mb-1'>${this.props.item.price}</p>
          <p className='card-text text-truncate text-wrap' style={{ height: '3rem' }}>
            {this.props.item.shortDescription}
          </p>
        </div>
        <div className='card-footer d-flex justify-content-around bg-transparent border-0 pb-3' id={this.props.item.productId}>
          <button type='button' className='btn btn-sm btn-outline-info card-btn' onClick={this.handleClickOrder}>
            Buy Now
          </button>
          <button type='button' className='btn btn-sm btn-outline-primary card-btn' onClick={this.handleClickCart}>
            Add to Cart
          </button>
        </div>
        <hr className='m-0' />
      </div>
    );
  }
}
