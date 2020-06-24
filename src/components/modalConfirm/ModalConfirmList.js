import React from 'react';

function ModalConfirmList(props) {
  return (
    <React.Fragment>
      <div className='modal-container'>
        <div className='modal-box'>
          <div className='modal-content'>
            {props.title &&
              <div className='title'>
                {props.title}
              </div>
            }

            <div
              className='modal-content-children'
              style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}
            >
              {props.children}
            </div>

            <div className='btn-container'>
              <button
                className='btn-style'
                onClick={() => {
                  if (props.onAccept) {
                    props.onAccept()
                  }
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

export { ModalConfirmList };