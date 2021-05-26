import React, { useState } from 'react';

const MerchantStatus = (props) => {
  const { status, onSaveStatus } = props;
  const [isActive, setActiveStatus] = useState(status);

  const handleSaveStatus = () => {
    onSaveStatus(isActive);
  }

  return (
    <>
      {
        <div>
          {status ? 'El merchant tiene activo el uso de Cupo Cajero' : 'El merchant no tiene activo el uso de Cupo Cajero'}
        </div>
      }
      <div className='form-check mt-3'>
        <input
          checked={isActive}
          onChange={e => setActiveStatus(e.target.checked)}
          className='form-check-input'
          type='checkbox'
          id='status'
        />
        <label className='form-check-label' for='status'>
          Habilitar Cupo Cajero
        </label>
      </div>
      <button
        className='btn btn-secondary'
        onClick={handleSaveStatus}
      >
        Guardar estado
      </button>
    </>
  );
}

export default MerchantStatus;
