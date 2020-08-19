import React from 'react';
import Loading from './loading';

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
    this.props.addToCart(this.state.product.productId);
  }

  render() {
    if (!this.state.product) {
      return <Loading />;
    } else {
      const { image, name, price, shortDescription, longDescription } = this.state.product;
      const newLongDescription = longDescription.split(/\r?\n/).map((sentence, index) => {
        return (
          <span key={index}>
            {`${sentence}`}
            <br />
          </span>
        );
      });

      const productDetailMenu = (
        <div className='row m-0'>
          <h5 className='text-muted hvr-icon-back px-3 px-sm-0 py-1' style={{ cursor: 'pointer' }} onClick={this.handleBack}>
            <i className='fas fa-angle-left hvr-icon'></i> Back to catalog
          </h5>
        </div>
      );

      const productDetailBody = (
        <div className='row align-items-center m-0'>
          <div className='col-sm-12 col-md-5 pt-3'>
            <img src={image} className='card-img-top' alt={name} style={{ height: '300px', objectFit: 'contain' }} />
          </div>
          <div className='col-sm-12 col-md-7 p-4 p-sm-4 p-md-4'>
            <h5 className='card-title mb-3'>
              <b>{name}</b>
            </h5>
            <p className='card-text text-muted mb-3'>${price}</p>
            <p className='card-text'>{shortDescription}</p>
            <button type='button' className='btn btn-outline-primary' onClick={this.handleClickCart}>
              Add to Cart
            </button>
          </div>
        </div>
      );

      const productDetailDesciption = (
        <div className='col'>
          <hr />
          <p className='p-2 p-sm-3 p-md-4'>{newLongDescription}</p>
        </div>
      );

      return (
        <div className='container product-detail-container my-2 my-sm-3 p-0'>
          {productDetailMenu}
          <div className='row d-flex card m-0'>
            {productDetailBody}
            {productDetailDesciption}
          </div>
        </div>
      );
    }
  }
}
