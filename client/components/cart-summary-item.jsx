import React from 'react';

export default function CartSummaryItem(props) {
  const priceLength = this.props.product.price.toString().length;
  const price = '$' + this.props.product.price.toString().substr(0, priceLength - 2) + '.' + this.props.product.price.toString().substr(priceLength - 2);

  return (
    <div className="row justify-content-between align-items-center card">
      <div className="col-sm-6 col-md-5">
        <img src={this.props.product.image} className="card-img-top px-4" alt={this.props.product.name}
          style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
      </div>
      <div className="col-sm-6 col-md-7 px-4">
        <h5 className="card-title mb-3"><b>{this.props.product.name}</b></h5>
        <p className="card-text text-muted mb-3">{price}</p>
        <p className="card-text">{this.props.product.shortDescription}</p>
      </div>
    </div>
  );
}
