import React from 'react';

function ModalConfirm(props) {
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

            <div className='modal-content-children'>
              {props.message}
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

            {props.onCancel &&
              <div className='btn-container'>
                <button
                  className='btn-style'
                  onClick={() => {
                    if (props.onCancel) {
                      props.onCancel()
                    }
                  }}
                >
                  Cancelar
              </button>
              </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

export { ModalConfirm };