import React, { useEffect, useRef, useState } from 'react';
import LlevateloBusiness from '../../business/LlevateloBusiness';
import loading from '../../lib/ui/loading';

const InteresesLlevateloView = () => {
  const [interests, setInterests] = useState(0);
  const percentageInput = useRef(null);

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    loading.showLoadingScreen();
    const interests = await LlevateloBusiness.fetchInterest();
    loading.hideLoadingScreen();

    if (interests) {
      setInterests(interests.interestPercent);
    } else {
      alert('Ha ocurrido un error al consultar la tasa de interés actual :(');
    }
  };

  const registerInterest = async (e) => {
    e.preventDefault();
    const percentage = parseFloat(percentageInput.current.value);

    loading.showLoadingScreen();
    const success = await LlevateloBusiness.registerInterest(percentage);
    loading.hideLoadingScreen();

    if (success) {
      setInterests(percentage);
    } else {
      alert('Ha ocurrido un error al guardar la nueva tasa de interés, intenta nuevamente.');
    }
  };

  return (
    <>
      <h3>
        Tasa de interés actual:
        <span className='text-success ml-1'>
          {interests} %
        </span>
      </h3>

      <form className='mt-4' onSubmit={registerInterest}>
        <div className='form-group row justify-content-center'>
          <label
            htmlFor='intereses'
            className='col-sm-2 col-form-label'
          >
            Nueva tasa de interés:
          </label>
          <div className='col-sm-4'>
            <input
              ref={percentageInput}
              type='number'
              className='form-control'
              id='intereses'
              placeholder='Nueva tasa'
              step='0.01'
              required
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-sm-6 text-right'>
            <button
              type='submit'
              className='btn btn-primary mb-2'
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InteresesLlevateloView;
