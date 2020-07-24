import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.selectedView('details', parseInt(event.currentTarget.id));
  }

  render() {
    const priceLength = this.props.item.price.toString().length;
    const price = '$' + this.props.item.price.toString().substr(0, priceLength - 2) + '.' + this.props.item.price.toString().substr(priceLength - 2);

    return (
      <div className="product-list-item card col-lg-3 col-sm-5 m-3 p-0"
        style={{ width: '18rem', cursor: 'pointer' }} id={this.props.item.productId} onClick={this.handleClick}>
        <img src={this.props.item.image} className="card-img-top" alt={this.props.item.name}
          style={{ width: '100%', height: '250px', objectFit: 'contain' }}/>
        <div className="card-body">
          <h5 className="card-title"><b>{this.props.item.name}</b></h5>
          <p className="card-text text-muted">{price}</p>
          <p className="card-text">{this.props.item.shortDescription}</p>
        </div>
      </div>
    );
  }
}
