import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={props.image} className="card-img-top" alt={props.name}
        style={{ width: '100%', minHeight: '200px', objectFit: 'cover' }}/>
      <div className="card-body">
        <h5 className="card-title"><b>{props.name} Title test</b></h5>
        <p className="card-text text-muted">{props.price} $29.99</p>
        <p className="card-text">{props.description} Some quick example text Some quick example textSome quick example text</p>
      </div>
    </div>
  );
}
