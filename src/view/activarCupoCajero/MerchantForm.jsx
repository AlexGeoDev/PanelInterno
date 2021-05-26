import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MerchantForm = (props) => {
  const merchantInpuRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const merchantValue = merchantInpuRef.current.value;
    props.onSubmit(merchantValue);
  }

  return (
    <form className='form-inline' onSubmit={handleSubmit}>
      <div className='form-group mb-2'>
        <label for='merchant' className='mr-3'>Merchant</label>
        <input
          required
          ref={merchantInpuRef}
          type='text'
          className='form-control'
          id='merchant'
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary mb-2 ml-3'>
        Consultar
      </button>
    </form>
  );
};

MerchantForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MerchantForm;
