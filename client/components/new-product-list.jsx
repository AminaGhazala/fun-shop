import React from 'react';

export default class NewProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], windowWidth: window.innerWidth };
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleClick(event) {
    const param = { productId: parseInt(event.currentTarget.id) };
    this.props.selectedView('details', param);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    this.getProducts();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(() => console.error('server response error'));
  }

  getArrayChunk(array, chunkSize) {
    var result = array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    return result;
  }

  getItemCount(size) {
    if (this.state.windowWidth < 576) {
      return 1;
    } else if (this.state.windowWidth < 768) {
      return 2;
    } else {
      return 3;
    }
  }

  render() {
    return (
      <div className='container mt-1 mb-2 my-sm-3 mb-md-4'>
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
              {this.getArrayChunk(this.state.products, this.getItemCount()).map((itemChunk, index) => {
                return (
                  <div className={index === 0 ? 'carousel-item row no-gutters active' : 'carousel-item row no-gutters'} key={index}>
                    {itemChunk.map(item => {
                      return (
                        <div
                          className='card col-12 col-sm-6 col-md-4 float-left border-0'
                          key={item.productId}
                          id={item.productId}
                          onClick={this.handleClick}>
                          <img
                            src={item.image.split(',')[0]}
                            className='card-img-top mt-3'
                            alt={item.name}
                            style={{ height: '200px', objectFit: 'contain' }}
                          />
                          <div className='card-body pb-0 px-3 text-center'>
                            <p className='card-text mb-1 text-center font-italic'>${item.price}</p>
                            <h6 className='card-title m-0 mb-2 text-truncate text-wrap text-capitalize' style={{ minHeight: '40px' }}>
                              {item.name}
                            </h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
