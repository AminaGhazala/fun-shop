import React from 'react';

export default function Header(props) {
  const cartItemTitle = props.cartItem === 1 ? '1 Item' : `${props.cartItem} Items`;
  return (
    <div className="shadow-lg bg-dark text-white d-flex justify-content-between align-items-center p-3 px-5">
      <h2 className="d-inline-block"><i className="fas fa-dollar-sign pr-2"></i>{props.title}</h2>
      <h5 className="d-inline-block">{cartItemTitle} <i className="fas fa-shopping-cart pl-2"></i></h5>
    </div>
  );
}
