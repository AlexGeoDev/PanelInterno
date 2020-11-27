import React, { useState } from 'react';
import { FieldForm } from '../../components/fieldForm/FieldForm';

const CommerceFilter = (props) => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onFilter(email, date);
  }

  const resetFilter = () => {
    setEmail('');
    setDate('');
    props.onFilter();
  }

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <div className='row justify-content-center mb-3'>
        <div className='col-6 mb-3'>
          <FieldForm
            value={email}
            label='Correo'
            onChangeValue={(value) => setEmail(value)}
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

export default CommerceFilter;
