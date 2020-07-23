import React from 'react';

export default function Header(props) {
  return (
    <h2 className="shadow-lg bg-dark text-white p-3 pl-5">{props.title}</h2>
  );
}
