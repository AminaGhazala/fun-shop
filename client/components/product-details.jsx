import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    this.getProduct(1);
  }

  getProduct(productId) {
    if (isNaN(productId) || productId < 0) {
      return console.error(`Invalid productId: ${productId}`);
    }

    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <p>Product</p>
      );
    }
  }
}
