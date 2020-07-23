import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: [] };
  }

  render() {
    return (
      <ProductListItem />
    );
  }
}
