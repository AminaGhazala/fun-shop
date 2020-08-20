import React from 'react';

export default function Carousel(props) {
  const indicator = (
    <ol className='carousel-indicators'>
      {props.images.map((image, index) => {
        return <li data-target='#carouselProductImages' data-slide-to={index} key={index} className={index === 0 ? 'active' : ''}></li>;
      })}
    </ol>
  );

  const controlBtn = (
    <>
      <a className='carousel-control-prev' href='#carouselProductImages' role='button' data-slide='prev'>
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='sr-only'>Previous</span>
      </a>
      <a className='carousel-control-next' href='#carouselProductImages' role='button' data-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='sr-only'>Next</span>
      </a>
    </>
  );

  return (
    <>
      <div id='carouselProductImages' className='carousel slide' data-ride='carousel' data-interval='2000'>
        {props.images.length > 1 ? indicator : <></>}
        <div className='carousel-inner'>
          {props.images.map((image, index) => {
            return (
              <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                <img className='d-block w-100' src={image} alt={`${index} slide`} />
              </div>
            );
          })}
        </div>
        {props.images.length > 1 ? controlBtn : <></>}
      </div>
    </>
  );
}
