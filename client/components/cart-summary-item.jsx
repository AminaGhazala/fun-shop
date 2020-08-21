import React from 'react';

export default function CartSummaryItem(props) {
  const { name, price, shortDescription } = props.product;
  const image = props.product.image.split(',');

  const typeCart = (
    <div className='card my-1 my-sm-2'>
      <div className='row align-items-center m-0'>
        <div className='col-3'>
          <img src={image[0]} className='card-img-top p-sm-3' alt={name} style={{ height: '7rem', objectFit: 'contain' }} />
        </div>
        <div className='col-9'>
          <h6 className='card-title mb-0 mb-sm-2'>{name}</h6>
          <p className='card-text text-muted mb-0 mb-sm-2'>${price}</p>
          <p className='card-text text-truncate' style={{ height: '1.5rem' }}>
            {shortDescription}
          </p>
        </div>
      </div>
    </div>
  );

  const typeCheckout = (
    <div className='card checkout-card-container my-1 my-sm-2 border-0'>
      <div className='row align-items-center m-0'>
        <div className='col-2 pl-0 pr-2 cart-item'>
          <span className="quantity-badge">1</span>
          <img src={image[0]} className='card-img-top' alt={name} style={{ maxWidth: '2.5rem', maxHeight: '2.5rem', objectFit: 'contain', border: '1px solid gray' }} />
        </div>
        <div className='col-8 col-sm-7 p-0'>
          <p className='card-title m-0' style={{ lineHeight: '90%' }}>
            <small>{name}</small>
          </p>
        </div>
        <div className='col-2 col-sm-3 px-0'>
          <p className='card-text text-muted text-right text-nowrap'>${price}</p>
        </div>
      </div>
    </div>
  );

  return props.type === 'cart' ? typeCart : typeCheckout;
}
