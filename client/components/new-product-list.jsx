import React from 'react';
import $ from 'jquery';

export default class NewProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const param = { productId: parseInt(event.currentTarget.id) };
    this.props.selectedView('details', param);
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

  showItems(number) {
    $('#newProductCarousel .carousel-item').each(function () {
      const minPerSlide = number;
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (let i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
      }
    });
  }

  render() {
    this.showItems(1);
    return (
      <div className='container my-1 my-sm-3 mb-md-4'>
        <div className='row'>
          <h4 className='px-3 px-sm-0 mb-sm-3'>New Arrival Items</h4>
        </div>
        <div className='row my-auto d-flex justify-content-around'>
          <div
            id='newProductCarousel'
            className='new-product-container carousel slide w-100 border'
            data-ride='carousel'
            data-interval='3000'
            style={{ cursor: 'pointer' }}>
            <div className='carousel-inner w-100 px-5' role='listbox'>
              {this.state.products.map((product, index) => {
                return (
                  <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                    <div className='card col-12 col-sm-6 col-md-4 border-0' id={product.productId} onClick={this.handleClick}>
                      <img
                        src={product.image.split(',')[0]}
                        className='card-img-top mt-3'
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'contain' }}
                      />
                      <div className='card-body pb-0 px-3 text-center'>
                        <p className='card-text mb-1 text-center font-italic'>${product.price}</p>
                        <h6 className='card-title m-0 mb-2 text-truncate text-wrap text-capitalize' style={{ minHeight: '40px' }}>
                          {product.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })
              }
            </div>
            <a className='carousel-control-prev w-auto ml-2 ml-md-4' href='#newProductCarousel' role='button' data-slide='prev'>
              <span className='carousel-control-prev-icon bg-dark border border-dark rounded-circle' aria-hidden='true'></span>
              <span className='sr-only'>Previous</span>
            </a>
            <a className='carousel-control-next w-auto mr-2 mr-md-4' href='#newProductCarousel' role='button' data-slide='next'>
              <span className='carousel-control-next-icon bg-dark border border-dark rounded-circle' aria-hidden='true'></span>
              <span className='sr-only'>Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
