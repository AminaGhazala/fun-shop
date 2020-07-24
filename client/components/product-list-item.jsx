import React from 'react';

export default function ProductListItem(props) {
  const priceLength = props.item.price.toString().length;
  const price = '$' + props.item.price.toString().substr(0, priceLength - 2) + '.' + props.item.price.toString().substr(priceLength - 2);

  return (
    <div className="product-list-item card col-lg-3 col-sm-5 m-3 p-0"
      style={{ width: '18rem', cursor: 'pointer' }}>
      <img src={props.item.image} className="card-img-top" alt={props.item.name}
        style={{ width: '100%', height: '250px', objectFit: 'contain' }}/>
      <div className="card-body">
        <h5 className="card-title"><b>{props.item.name}</b></h5>
        <p className="card-text text-muted">{price}</p>
        <p className="card-text">{props.item.shortDescription}</p>
      </div>
    </div>
  );
}
