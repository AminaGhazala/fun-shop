import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      zipcode: '',
      city: '',
      state: '',
      phone: '',
      cardNumber: '',
      cardSecurityCode: '',
      cardExpMonth: '',
      cardExpYear: '',
      tnc: false
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOrder = this.handleClickOrder.bind(this);
    this.years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.states = ['Alaska', 'Alabama', 'Arkansas', 'American Samoa', 'Arizona', 'California', 'Colorado', 'Connecticut', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Iowa', 'Idaho', 'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska', 'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Virgin Islands', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming'];
  }

  getTotalPrice() {
    const totalPrice = this.props.cart.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.price), 0);
    if (totalPrice === 0) {
      return 'Total: 0';
    } else {
      return 'Total: $' + parseFloat(totalPrice).toFixed(2).toLocaleString();
    }
  }

  handleBack() {
    this.setState({ firstName: '', lastName: '', address: '', address2: '', zipcode: '', city: '', state: '', phone: '', cardNumber: '', cardSecurityCode: '', cardExpMonth: '', cardExpYear: '', tnc: false });
    this.props.selectedView('catalog', {});
  }

  handleChange(event) {
    if (event.target.id === 'tnc') {
      this.setState({ [event.target.id]: event.target.checked });
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
  }

  handleClickOrder(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  render() {
    const checkoutMenu = (
      <div className='row m-0'>
        <h5 className='text-muted hvr-icon-back px-3 px-sm-0 py-1' style={{ cursor: 'pointer' }} onClick={this.handleBack}>
          <i className='fas fa-angle-left hvr-icon'></i> Continue Shopping
        </h5>
      </div>
    );

    const checkoutNotice = (
      <div className='row m-0'>
        <div className='col-12 alert alert-warning text-center px-2' role='alert'>
          <strong>DO NOT USE</strong> your real payment information. This website is for <strong>demonstration purposes only</strong>.
        </div>
      </div>
    );

    const checkoutForm = (
      <form className='checkout-form-container' onSubmit={this.handleClickOrder}>
        <h5 className='pb-2'>Shipping Address</h5>
        <div className='form-row'>
          <div className='col-6 mb-2'>
            <input type='text' className='form-control' id='firstName' placeholder='First name' autoFocus required onChange={this.handleChange} />
          </div>
          <div className='col-6 mb-2'>
            <input type='text' className='form-control' id='lastName' placeholder='Last name' required onChange={this.handleChange} />
          </div>
        </div>
        <div className='form-row'>
          <div className='col-12 mb-2'>
            <input type='text' className='form-control' id='address' placeholder='Address' required onChange={this.handleChange} />
          </div>
        </div>
        <div className='form-row'>
          <div className='col-12 mb-2'>
            <input
              type='text'
              className='form-control'
              id='address2'
              placeholder='Apartment, suite, etc. (optional)'
              value=''
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='col-4 mb-2'>
            <input
              type='text'
              className='form-control'
              id='zipcode'
              placeholder='ZIP code'
              pattern='[0-9]{5,6}'
              title='ZIP code is at least 5 digits.'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='col-4 mb-2'>
            <input type='text' className='form-control' id='city' placeholder='City' required onChange={this.handleChange} />
          </div>
          <div className='col-4 mb-2'>
            <select className='custom-select' name='state' id='state' defaultValue='California' required onChange={this.handleChange}>
              {this.states.map((state, index) => {
                return (
                  <option key={index} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-12 mb-3'>
            <input type='text' className='form-control' id='phone' placeholder='Phone number (optional)' onChange={this.handleChange} />
          </div>
        </div>
        <h5 className='py-2'>Payment Method</h5>
        <div className='form-row'>
          <div className='form-check form-check-inline px-2 pb-2'>
            <input className='form-check-input' type='radio' name='creaditCard' id='creaditCard' defaultChecked />
            <label className='form-check-label' htmlFor='creaditCard'>
              Credit or debit card
              <span> </span>
              <img src='/images/credit-cards.jpg' alt='credit cards' style={{ height: '1.3rem', objectFit: 'contain' }} />
            </label>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-6 mb-2'>
            <input
              type='text'
              className='form-control'
              id='cardNumber'
              placeholder='Card number'
              pattern='[0-9]{15,19}'
              title='Card number is at least 15 digits.'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='col-6 mb-2'>
            <input
              type='password'
              className='form-control'
              id='cardSecurityCode'
              placeholder='Security code'
              pattern='[0-9]{3,4}'
              title='Security code is 3 or 4 digits.'
              required
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='col-6 mb-2'>
            <select className='custom-select' name='cardExpMonth' id='cardExpMonth' maxLength='4' required onChange={this.handleChange}>
              <option value=''> Card Expiration Month </option>
              {this.months.map((month, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} - {month}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='col-6 mb-2'>
            <select className='custom-select' name='cardExpYear' id='cardExpYear' required onChange={this.handleChange}>
              <option value=''> Year </option>
              {this.years.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='form-group mt-3'>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' id='tnc' required onClick={this.handleChange} />
            <label className='form-check-label' htmlFor='tnc'>
              Upon clicking &quot;Place Order&quot;, I confirm no payment process takes place and the data entered here is not my personal
              information.
            </label>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-outline-info' style={{ width: '12rem' }}>
              Place Order
          </button>
        </div>
      </form>
    );

    const checkoutTitle = (
      <div className='row m-0'>
        <h5 className='pb-2'>Order Summary</h5>
      </div>
    );

    const checkoutContents = (
      this.props.cart.map((item, index) => (
        <CartSummaryItem product={item} key={index} type='checkout' />
      ))
    );

    const checkoutTotal = (
      <div className='row d-flex m-0'>
        <h4 className='col m-0 px-0 pt-2 pb-4 text-right'>
          <strong>{this.getTotalPrice()}</strong>
        </h4>
      </div>
    );

    return (
      <div className='container checkout-form-container my-2 my-sm-3 p-0'>
        {checkoutMenu}
        {checkoutNotice}
        <div className='row d-flex m-0'>
          <div className='col-12 col-md-6 col-lg-7 order-2 order-md-1'>
            {checkoutForm}
          </div>
          <div className='col-12 col-md-6 col-lg-5 order-1 order-md-2'>
            {checkoutTitle}
            <hr className='mb-2 mt-0 mb-md-3' />
            {checkoutContents}
            <hr className='my-2 mt-md-3 mb-md-1' />
            {checkoutTotal}
          </div>
        </div>
      </div>
    );
  }
}
