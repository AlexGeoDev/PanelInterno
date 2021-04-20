import React from 'react';
import { getFormattedDate } from '../../lib/utils/dateUtils';

const getStatus = (status) => {
  switch (status) {
    case 'PAID':
      return 'Pagada';
    case 'PENDING_PAYMENT':
      return 'Pendiente de pago';
    case 'IN_PAYMENT_PROCESS':
      return 'En proceso de pago';
    default:
      return 'Anulada';
  }
};

const isTransactionCanceled = (status) => {
  console.log(status)
  if (status === 'PENDING_PAYMENT' || status === 'PAID' || status === 'IN_PAYMENT_PROCESS') {
    return false;
  }
console.log('SISISIIS')
  return true;
}

const TransactionList = (props) => {
  const {
    transactions,
    onCancelTransaction,
  } = props;

  return (
    <table className='table table-striped mt-4'>
      <thead>
        <tr>
          <th scope='col' className='text-left'>Teléfono Comprador</th>
          <th scope='col'>Secuencia</th>
          <th scope='col' className='text-right'>Valor</th>
          <th scope='col' className='text-right'>Intereses</th>
          <th scope='col'>Fecha Compra</th>
          <th scope='col'>Comercio</th>
          <th scope='col'>Estado</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map(transaction =>
            <Transaction
              key={transaction.id}
              onCancelTransaction={onCancelTransaction}
              {...transaction}
            />
          )
        }
      </tbody>
    </table>
  );
}

const Transaction = (props) => {
  const {
    id,
    onCancelTransaction,
    status,
    merchantCode,
    sequence,
    intereses,
    valor,
    phone,
    fechaCompra,
  } = props;

  const isCanceled = isTransactionCanceled(status);
  const isCancelDisabled = isCanceled || status !== 'PENDING_PAYMENT';

  const cancelPurchase = () => {
    const cancel = window.confirm('¿Esta seguro que quiere anular esta compra?');

    if (cancel) {
      onCancelTransaction(id);
    }
  };

  return (
    <tr>
      <td className='text-left'>{phone}</td>
      <td>{sequence}</td>
      <td className='text-right'>{valor}</td>
      <td className='text-right'>{intereses ? intereses : 0}</td>
      <td>{getFormattedDate(fechaCompra)}</td>
      <td>{merchantCode}</td>
      <td
        className={isCanceled ?
          'text-danger' :
          'text-info'}
      >
        <strong>
          {getStatus(status)}
        </strong>
      </td>
      <td>
        <button
          className='btn btn-sm btn-outline-danger'
          onClick={cancelPurchase}
          disabled={isCancelDisabled}
          title={isCancelDisabled ? 'No es posible anular esta compra' : 'Anular compra'}
        >
          Anular
        </button>
      </td>
    </tr >
  );
}

export default TransactionList;
