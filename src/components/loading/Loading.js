import React from 'react';

function Loading(props) {
  return (
    <React.Fragment>
      <div className='modal-container'>

        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <style jsx>
          {
            `
            .modal-container{
              border:0;
              background-color:rgba(0,0,0,0.3);
              z-index:100;
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
              position: fixed;
              top:0;
              left:0;
              right:0;
              bottom:0;
              display:flex;
              justify-content:center;
              align-items:center;
            }
          `
          }
        </style>
      </div>
    </React.Fragment>
  );
}

export { Loading };