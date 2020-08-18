import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.handleBack = this.handleBack.bind(this);
    this.handleClickCart = this.handleClickCart.bind(this);
  }

  componentDidMount() {
    this.getProduct(this.props.viewParam.productId);
  }

  getProduct(productId) {
    if (!productId || productId < 0) {
      return console.error(`Invalid productId: ${productId}`);
    }

    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(() => console.error('server response error'));
  }

  handleBack() {
    this.props.selectedView('catalog', {});
  }

  handleClickCart() {
    this.props.addToCart(this.state.product);
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      const priceLength = this.state.product.price.toString().length;
      const price = '$' + this.state.product.price.toString().substr(0, priceLength - 2) + '.' + this.state.product.price.toString().substr(priceLength - 2);

      const productDetailMenu = (
        <div className="row justify-content-center">
          <div className="col" style={{ cursor: 'pointer' }} onClick={this.handleBack} >
            <p className="text-muted p-4 m-0">&lt; Back to catalog</p>
          </div>
        </div>
      );

      const productDetailBody = (
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-5">
            <img src={this.state.product.image} className="card-img-top px-4" alt={this.state.product.name}
              style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
          </div>
          <div className="col-sm-6 col-md-7 px-4">
            <h5 className="card-title mb-3"><b>{this.state.product.name}</b></h5>
            <p className="card-text text-muted mb-3">{price}</p>
            <p className="card-text">{this.state.product.shortDescription}</p>
            <button type="button" className="btn btn-primary" onClick={this.handleClickCart}>Add to Cart</button>
          </div>
        </div>
      );

      const productDetailDesciption = (
        <div className="row justify-content-center">
          <div className="col">
            <p className="px-4 py-3">{this.state.product.longDescription}</p>
          </div>
        </div>
      );

      return (
        <div className='container d-flex justify-content-center align-items-center'>
          <div className='product-detail-container card mt-3'>
            {productDetailMenu}
            {productDetailBody}
            {productDetailDesciption}
          </div>
        </div>
      );
    }
  }
}
