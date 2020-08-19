import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const productList = this.state.products.map(element => (
      <ProductListItem key={element.productId} item={element} selectedView={this.props.selectedView} addToCart={this.props.addToCart} />
    ));

    return (
      <div className='container product-list-container my-1 my-sm-3'>
        <div className='row'>
          <h4 className='px-3 px-sm-0 mb-sm-3'>New Arrival Items</h4>
        </div>
        <div className='row d-flex justify-content-center align-items-center border rounded p-3'>{productList}</div>
      </div>
    );
  }
}
