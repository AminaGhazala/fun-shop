import React from 'react';

export default function CartSummaryItem(props) {
  const priceLength = props.product.price.toString().length;
  const price = '$' + props.product.price.toString().substr(0, priceLength - 2) + '.' + props.product.price.toString().substr(priceLength - 2);

  return (
    <div className="card my-4">
      <div className="row align-items-center">
        <div className="col-sm-6 col-md-5">
          <img src={props.product.image} className="card-img-top p-4" alt={props.product.name}
            style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
        </div>
        <div className="col-sm-6 col-md-7 px-4">
          <h5 className="card-title mb-3"><b>{props.product.name}</b></h5>
          <p className="card-text text-muted mb-3">{price}</p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
