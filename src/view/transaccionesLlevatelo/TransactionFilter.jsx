import React, { useState } from 'react';
import DatePicker from '../../components/datePicker/DatePicker';
import { FieldForm } from '../../components/fieldForm/FieldForm';

const TransactionFilter = ({ onFilter, onDownloadCSV }) => {
  const [reference, setReference] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter(date, date, reference);
  }

  const handleFilter = (startDate, endDate) => {
    onFilter(startDate, endDate, null);
  };

  const resetFilter = () => {
    setReference('');
    setDate('');
    onFilter();
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
        className='btn btn-primary mr-2'
        type='submit'
      >
        Consultar
      </button>
      <button
        className='btn btn-outline-success'
        type='button'
        onClick={onDownloadCSV}
      >
        Exportar CSV
      </button>
    </form>
  );
}

export default TransactionFilter;
