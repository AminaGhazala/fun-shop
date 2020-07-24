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
    const productList = this.state.products.map(element =>
      <ProductListItem key={element.productId} item={element} selectedView={this.props.selectedView}/>
    );

    return (
      <div className="product-list-container m-5" style={{ maxWidth: '97vw' }}>
        <div className="row justify-content-center">
          {productList}
        </div>
      </div>
    );
  }
}
