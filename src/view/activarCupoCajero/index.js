import React, { useState } from 'react';
import MerchantForm from './MerchantForm';
import LlevateloBusiness from '../../business/LlevateloBusiness';
import loading from '../../lib/ui/loading';
import MerchantStatus from './MerchantStatus';

const ActivarCupoCajero = () => {
  const [isMerchantActive, setMerchantStatus] = useState(null);
  const [merchant, setMerchant] = useState('');

  const fetchMerchantStatus = async (merchant) => {
    setMerchant(merchant);
    loading.showLoadingScreen();
    const status = await LlevateloBusiness.fetchMerchantUseCupoCajeroStatus(merchant);
    loading.hideLoadingScreen();

    setMerchantStatus(status);
  }

  const updateMerchantStatus = async (status) => {
    loading.showLoadingScreen();
    const response = await LlevateloBusiness.setCommerceUseCupoCajero(merchant, status);
    loading.hideLoadingScreen();

    setMerchantStatus(null);

    if (response) {
      window.alert('Guardado exitosamente')
    } else {
      window.alert('Ha ocurrido un error al guardar el estado de Cupo Cajero del comercio')
    }
  }

  return (
    <div className='d-flex align-items-center flex-column'>

      <h3 className='mb-3'>
        Estado de uso de Cupo Cajero de comercios
      </h3>
      <MerchantForm
        onSubmit={fetchMerchantStatus}
      />
      {
        (isMerchantActive !== null) &&
        <MerchantStatus
          status={isMerchantActive}
          onSaveStatus={updateMerchantStatus}
        />
      }

    </div>
  );
}

export default ActivarCupoCajero;
