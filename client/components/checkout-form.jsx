import React from 'react';

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
    const states = ['Alaska', 'Alabama', 'Arkansas', 'American Samoa', 'Arizona', 'California', 'Colorado', 'Connecticut', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Iowa', 'Idaho', 'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska', 'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Virgin Islands', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming'];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const checkoutMenu = (
      <div className='row m-0'>
        <h5 className='text-muted hvr-icon-back px-3 px-sm-0 py-1' style={{ cursor: 'pointer' }} onClick={this.handleBack}>
          <i className='fas fa-angle-left hvr-icon'></i> Continue Shopping
        </h5>
      </div>
    );

    const checkoutForm = (
      <form onSubmit={this.handleClickOrder}>
        <div className='alert alert-warning text-center' role='alert'>
          <strong>DO NOT USE</strong> your real payment information. This website is for <strong>demonstration purposes only</strong>.
        </div>
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
            <input type='text' className='form-control' id='zipcode' placeholder='ZIP code' maxLength='6' required onChange={this.handleChange} />
          </div>
          <div className='col-4 mb-2'>
            <input type='text' className='form-control' id='city' placeholder='City' required onChange={this.handleChange} />
          </div>
          <div className='col-4 mb-2'>
            <select className='custom-select' name='state' id='state' defaultValue='California' required onChange={this.handleChange}>
              {states.map((state, index) => {
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
              maxLength='19'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='col-6 mb-2'>
            <input type='password' className='form-control' id='cardSecurityCode' placeholder='Security code' required onChange={this.handleChange} />
          </div>
        </div>
        <div className='form-row'>
          <div className='col-6 mb-2'>
            <select className='custom-select' name='cardExpMonth' id='cardExpMonth' maxLength='4' required onChange={this.handleChange}>
              <option value=''> Card Expiration Month </option>
              {months.map((month, index) => {
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
              <option value='2020'> 2020 </option>
              <option value='2021'> 2021 </option>
              <option value='2022'> 2022 </option>
              <option value='2023'> 2023 </option>
              <option value='2024'> 2024 </option>
              <option value='2025'> 2025 </option>
              <option value='2026'> 2026 </option>
              <option value='2027'> 2027 </option>
              <option value='2028'> 2028 </option>
              <option value='2029'> 2029 </option>
            </select>
          </div>
        </div>
        <div className='form-group mt-3'>
          <div className='form-check'>
            <input className='form-check-input' type='checkbox' id='tnc' required onClick={this.handleChange} />
            <label className='form-check-label' htmlFor='tnc'>
              Upon clicking &quot;Place Order&quot;, I confirm this website is for demonstration purposes only and no payment process takes place. I
              confirm the information entered is not my personal information.
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
        <h5 className='pb-2'>Check Out</h5>
      </div>
    );

    const checkoutTotal = (
      <div className='row m-0'>
        <h5 className='pb-2 text-muted'>{this.getTotalPrice()}</h5>
      </div>
    );

    const checkoutFooter = (
      <div className='row m-0'>

      </div>
    );

    return (
      <div className='container checkout-form-container my-2 my-sm-3 p-0'>
        {checkoutMenu}
        <div className='row d-flex m-0'>
          <div className="col-12 col-sm-5">
            {checkoutTitle}
            {checkoutTotal}
            {checkoutFooter}
          </div>
          <div className="col-12 col-sm-7">
            {checkoutForm}
          </div>
        </div>
      </div>
    );
  }
}
