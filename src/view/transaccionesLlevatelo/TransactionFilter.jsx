import React, { useState } from 'react';
import DatePicker from '../../components/datePicker/DatePicker';
import { FieldForm } from '../../components/fieldForm/FieldForm';

const TransactionFilter = (props) => {
  const [reference, setReference] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onFilter(date, date, reference);
  }

  const handleFilter = (startDate, endDate) => {
    props.onFilter(startDate, endDate, null);
  };

  const resetFilter = () => {
    setReference('');
    setDate('');
    props.onFilter();
  }

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <div className='row mb-3'>
        <div className='col-6'>
          <FieldForm
            value={reference}
            label='Secuencia'
            onChangeValue={(value) => setReference(value)}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-6'>
          <DatePicker
            onFilterPeriod={handleFilter}
            onFilterRange={handleFilter}
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
