import React, { useEffect, useState } from 'react';
import { fetchDatafonoPrice, createDiscountCoupon } from '../../business/product';
import { getFormatedPrice } from '../../lib/utils/currencyUtils';
import loading from '../../lib/ui/loading';

const DiscountCouponsView = () => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(30000);
  const [discountCoupon, setDiscountCoupon] = useState(null);

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    loading.showLoadingScreen();
    const response = await fetchDatafonoPrice();
    loading.hideLoadingScreen();

    if (response) {
      setPrice(response);
    }
  };

  const handleCreateCoupon = async () => {
    console.log(discount)
    loading.showLoadingScreen();
    const response = await createDiscountCoupon(discount);
    loading.hideLoadingScreen();

    if (response) {
      setDiscountCoupon(response);
    } else {
      window.alert('Ha ocurrido un error al crear el código :(');
    }
  };

  return (
    <>
      <h3>Generar código de descuento</h3>
      <small className='text-muted'>Los códigos generados son validos únicamente en el día de creación</small>

      <div className='my-4'>
        <span className='text-success'>
          <strong>
            Precio actual datáfono:
          </strong>
        </span>
        <span className='ml-1'>
          {getFormatedPrice(price)}
        </span>
      </div>

      <div className='mt-2'>
        Generar código con descuento de:
        <div className='form-check mt-2'>
          <input
            className='form-check-input'
            type='radio'
            name='codigo-30'
            id='codigo-301'
            value={30000}
            checked={discount == 30000}
            onChange={e => setDiscount(e.target.value)}
          />
          <label className='form-check-label' htmlFor='codigo-30'>
            $ 30,000
            {price &&
              <span className='ml-1'>
                Valor final de compra: <strong>{getFormatedPrice(price - 30000)}</strong>
              </span>
            }
          </label>
        </div>
      </div>

      <button
        className='btn btn-primary mt-3'
        onClick={handleCreateCoupon}
      >
        Generar código
      </button>

      {
        discountCoupon &&
        <div className='mt-4'>
          Código de descuento: <span className='ml-1 text-primary'><strong>{discountCoupon}</strong></span>
        </div>
      }
    </>
  );
};

export default DiscountCouponsView;
