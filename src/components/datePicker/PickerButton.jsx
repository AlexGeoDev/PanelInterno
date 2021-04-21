import React from 'react';

const PickerButton = (props) => {
  const {
    onClick,
    dateLabel,
  } = props;

  return (
    <button
      className='btn btn-outline-primary w-100 type13'
      type='button'
      onClick={onClick}>
      <div className="row d-flex m-auto justify-content-center align-items-center">
        <div className="col-2">
          <span>
            <i className="fas fa-chevron-down"></i>
          </span>
        </div>
        <div className="col-8 text-center">
          <span>{dateLabel}</span>
        </div>
        <div className="col-2">
          <i className="far fa-calendar-plus"></i>
        </div>
      </div>
      <style jsx>{`
        .btn-outline-primary{
          background: #FFFFFF 0% 0% no-repeat padding-box;
          box-shadow: 0px 2px 3px #0000000D;
          border: 1px solid #0000000D;
          border-radius: 4px;
          color: #1D2634;
          padding-bottom: 0px;
        }
        .btn-outline-primary:hover {
          color: #1D2634;
          background-color: #FFFFFF;
          border-color: #c5c5c5;
        }
        .btn-outline-primary:not(:disabled):not(.disabled):active:focus, 
        .show>.btn-outline-primary.dropdown-toggle:focus {
          box-shadow: none;
        }
        .btn-outline-primary:not(:disabled):not(.disabled).active,
        .btn-outline-primary:not(:disabled):not(.disabled):active, 
        .show>.btn-outline-primary.dropdown-toggle {
            color: #fff;
            background-color: #FFFFFF;
            border-color: #FFFFFF;
        }
      `}</style>
    </button>
  );
}

export default PickerButton;
