import React from 'react';
import { getFormattedDate } from '../../lib/utils/dateUtils';

const CommerceList = (props) => {
  const {
    commerceList,
    onOpenDetail,
  } = props;

  return (
    <table className='table table-striped mt-4'>
      <thead>
        <tr>
          <th scope='col' className='text-left'>Correo</th>
          <th scope='col'>Fecha</th>
          <th scope='col'>Estado</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {
          commerceList.map(commerce =>
            <CommerceItem
              key={commerce.idCommerce}
              onOpenDetail={onOpenDetail}
              {...commerce}
            />
          )
        }
      </tbody>
    </table>
  );
}

const CommerceItem = (props) => {
  const {
    idCommerce,
    email,
    registrationCompleted,
    date,
    onOpenDetail,
  } = props;

  return (
    <tr>
      <td className='text-left'>{email}</td>
      <td>{getFormattedDate(date)}</td>
      <td
        className={registrationCompleted ?
          'text-success' :
          'text-warning'}
      >
        <strong>
          {registrationCompleted ? 'Completado' : 'Incompleto'}
        </strong>
      </td>
      <td>
        <button
          className='btn btn-sm btn-outline-primary'
          onClick={() => onOpenDetail(idCommerce)}
        >
          Detalle
        </button>
      </td>
    </tr>
  );
}

export default CommerceList;
