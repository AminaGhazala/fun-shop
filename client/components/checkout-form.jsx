import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', creditCard: '', shippingAddress: '' };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOrder = this.handleClickOrder.bind(this);
  }

  getTotalPrice() {
    const totalPrice = this.props.cart.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.price), 0);
    if (totalPrice === 0) {
      return 'Order Total: 0';
    } else {
      return 'Order Total: $' + parseFloat(totalPrice).toFixed(2).toLocaleString();
    }
  }

  handleBack() {
    this.setState({ name: '', creditCard: '', shippingAddress: '' });
    this.props.selectedView('catalog', {});
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickOrder(event) {
    event.preventDefault();
    if (this.state.name.length === 0 || this.state.creditCard.length === 0 || this.state.shippingAddress.length === 0) {
      return alert('Please, fill all information');
    }

    this.props.placeOrder(this.state);
  }

  render() {
    const checkoutTitle = (
      <div className="row">
        <div className="col">
          <h1 className="pb-4">My Cart</h1>
        </div>
      </div>
    );

    const checkoutTotal = (
      <div className="row">
        <div className="col">
          <h4 className="pb-4 text-muted">{this.getTotalPrice()}</h4>
        </div>
      </div>
    );

    const checkoutForm = (
      <div className="row">
        <div className="col">
          <form className="pb-4">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="creditCard">Credit Card</label>
              <input className="form-control" type="text" name="creditCard" id="creditCard" value={this.state.creditCard} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address</label>
              <textarea className="form-control" name="shippingAddress" id="shippingAddress" cols="30" rows="5" value={this.state.shippingAddress} onChange={this.handleChange} required></textarea>
            </div>
          </form>
        </div>
      </div>
    );

    const checkoutFooter = (
      <div className="d-flex justify-content-between">
        <p className="text-muted" style={{ cursor: 'pointer' }} onClick={this.handleBack}>&lt; Continue Shopping</p>
        <button type="button" className="btn btn-primary" onClick={this.handleClickOrder}>Place Order</button>
      </div>
    );

    return (
      <div className='container d-flex justify-content-center align-items-center'>
        <div className="checkout-form-container mt-3">
          {checkoutTitle}
          {checkoutTotal}
          {checkoutForm}
          {checkoutFooter}
        </div>
      </div>
    );
  }
}
