import React from 'react';

export default function Welcome(props) {
  return (
    <div
      className={`modal ${props.show} ${props.anim}`}
      id='welcomePopup'
      role='dialog'
      tabIndex='-1'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content text-center'>
          <div className='modal-header' style={{ backgroundColor: 'rgb(91, 192,222)' }}>
            <h4 className='modal-title header-font mx-auto' id='welcomePopupLabel'>
              Welcome to Fun Shop
            </h4>
          </div>
          <div className='modal-body'>
            The contents of this website are for demonstration purpose only, not deliverable or guarantee of purchase. By clicking the ACCEPT button
            below, you will accept that no purchase and payment will be done. Please do not use your financial information to protect your privacy.
          </div>
          <div className='modal-footer justify-content-center'>
            <button type='button' className='btn btn-info' data-dismiss='modal' onClick={props.accept} style={{ width: '7rem' }}>
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
