import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    this.getProduct(this.props.viewParam.productId);
  }

  getProduct(productId) {
    if (isNaN(productId) || productId < 0) {
      return console.error(`Invalid productId: ${productId}`);
    }

    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const productDetailMenu = (
      <div className="row justify-content-center">
        <div className="col text-muted px-4 py-3" style={{ cursor: 'pointer' }} >&lt; Back to catalog</div>
      </div>
    );

    const productDetailBody = (
      <div className="row justify-content-center">
        <div className="col"></div>
      </div>
    );

    const productDetailDesciption = (
      <div className="row justify-content-center">
        <div className="col"></div>
      </div>
    );

    if (this.state.product === null) {
      return null;
    } else {
      return (
        <div className="product-detail-container card m-5" style={{ maxWidth: '97vw' }}>
          {productDetailMenu}
          {productDetailBody}
          {productDetailDesciption}
        </div>
      );
    }
  }
}
