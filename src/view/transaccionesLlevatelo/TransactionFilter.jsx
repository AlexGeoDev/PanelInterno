import React, { useState } from 'react';
import { FieldForm } from '../../components/fieldForm/FieldForm';

const TransactionFilter = (props) => {
  const [reference, setReference] = useState(null);
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onFilter(date, date, reference);
  }

  const resetFilter = () => {
    setReference(null);
    setDate('');
    props.onFilter();
  }

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <div className='row justify-content-center mb-3'>
        <div className='col-6 mb-3'>
          <FieldForm
            value={reference}
            label='Secuencia'
            onChangeValue={(value) => setReference(value)}
          />
        </div>

        <div className='col-6 mb-3'>
          <FieldForm
            type='date'
            label='Fecha'
            value={date}
            onChangeValue={(value) => setDate(value)}
          />
        </div>
      </div>
      <button
        className='btn btn-outline-primary mr-2'
        type='button'
        onClick={resetFilter}
      >
        Limpiar Filtro
      </button>
      <button
        className='btn btn-primary'
        type='submit'
      >
        Consultar
      </button>
    </form>
  );
}

export default TransactionFilter;
