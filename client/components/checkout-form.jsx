import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', creditCard: '', shippingAddress: '' };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOrder = this.handleClickOrder.bind(this);
  }

  handleBack() {
    this.setState({ name: '', shippingAddress: '' });

  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickOrder(event) {

    event.preventDefault();
  }

  render() {
    const checkoutTitle = (
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="pb-4 m-0">My Cart</h1>
        </div>
      </div>
    );

    const checkoutTotal = (
      <div className="row justify-content-center">
        <div className="col">
          <h4 className="m-0 text-muted">Order Total: $100.00</h4>
        </div>
      </div>
    );

    const checkoutForm = (
      <div className="row create-card-container">
        <h1 className="text-center">Create New Card</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input className="form-control" type="text" name="creditCard" id="creditCard" value={this.state.creditCard} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea className="form-control" name="shippingAddress" id="shippingAddress" cols="30" rows="5" value={this.state.shippingAddress} onChange={this.handleChange}></textarea>
          </div>
        </form>
      </div>
    );

    const checkoutFooter = (
      <div className="row justify-content-between">
        <div className="col">
          <p className="text-muted" style={{ cursor: 'pointer' }} onClick={this.handleBack}>&lt; Continue Shopping</p>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={this.handleClickOrder}>Place Order</button>
        </div>
      </div>
    );

    return (
      <div className="checkout-form-container m-5 px-4" style={{ maxWidth: '97vw' }}>
        {checkoutTitle}
        {checkoutTotal}
        {checkoutForm}
        {checkoutFooter}
      </div>
    );
  }
}
