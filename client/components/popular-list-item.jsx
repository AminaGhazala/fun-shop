import React from 'react';

export default class PopularListItem extends React.Component {
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
    const { name, productId, price, shortDescription } = this.props.item;
    const image = this.props.item.image.split(',');
    const newShortDescription = shortDescription.split(/\r?\n/).map((sentence, index) => {
      return (
        <span key={index}>
          {`${sentence}`}
          <br />
        </span>
      );
    });

    return (
      <div className='product-list-item card col-lg-4 col-sm-6 mb-4 border-0 hvr-grow' style={{ cursor: 'pointer' }}>
        <img
          src={image[0]}
          className='card-img-top'
          alt={name}
          style={{ height: '250px', objectFit: 'contain' }}
          id={productId}
          onClick={this.handleClick}
        />
        <div className='card-body pb-0 px-3 text-center' id={productId} onClick={this.handleClick}>
          <h6 className='card-title m-0 text-truncate text-wrap text-capitalize' style={{ minHeight: '40px' }}>
            <b>{name}</b>
          </h6>
          <p className='card-text text-muted text-truncate text-wrap mb-1' style={{ height: '3rem' }}>
            {newShortDescription}
          </p>
          <p className='card-text mb-1 text-center font-italic'>${price}</p>
        </div>
        <div className='card-footer d-flex justify-content-around bg-transparent border-0 pb-3' id={productId}>
          <button type='button' className='btn btn-sm btn-outline-primary card-btn px-0' style={{ width: '8rem' }} onClick={this.handleClickCart}>
            Add to Cart
          </button>
        </div>
        <hr className='m-0' />
      </div>
    );
  }
}
