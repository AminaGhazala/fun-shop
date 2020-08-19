import React from 'react';

export default function CartSummaryItem(props) {
  const { image, name, price, shortDescription } = props.product;

  return (
    <div className='card my-1 my-sm-2'>
      <div className='row align-items-center m-0'>
        <div className='col-3'>
          <img src={image} className='card-img-top p-sm-3' alt={name} style={{ height: '7rem', objectFit: 'contain' }} />
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
}
