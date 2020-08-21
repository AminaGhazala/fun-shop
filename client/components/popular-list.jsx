import React from 'react';
import PopularListItem from './popular-list-item';

export default class PopularList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/populars')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const productList = this.state.products.map(element => (
      <PopularListItem key={element.productId} item={element} selectedView={this.props.selectedView} addToCart={this.props.addToCart} />
    ));

    return (
      <div className='container popular-list-container my-1 my-sm-3'>
        <div className='row'>
          <h4 className='px-3 px-sm-0 mb-sm-3'>Most Popular Items</h4>
        </div>
        <div className='row d-flex justify-content-center align-items-center border rounded p-3'>{productList}</div>
      </div>
    );
  }
}
