import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TransactionFilter from './TransactionFilter';
import TransactionList from './TransactionList';
import llevateloBusiness from '../../business/LlevateloBusiness';
import loading from '../../lib/ui/loading/';
import { subDays, endOfDay, format } from 'date-fns';

const TransaccionesLlevateloView = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const startDate = format(subDays(new Date(), 8), 'yyyy-MM-dd');
    const endDate = format(endOfDay(new Date()), 'yyyy-MM-dd');

    fetchPurchaseList(startDate, endDate);
  }, []);

  const fetchPurchaseList = async (startDate, endDate, sequence) => {
    loading.showLoadingScreen();
    const response = await llevateloBusiness.fetchPurchaseList(startDate, endDate, sequence);
    loading.hideLoadingScreen();

    if (response) {
      setTransactions(response);
    }
  };

  const handleCancelPurchase = async (idPurchase) => {
    console.log('CANCELAR!!', idPurchase);

    loading.showLoadingScreen();
    const response = await llevateloBusiness.revertPurchase(idPurchase);
    loading.hideLoadingScreen();

    if (response) {
      window.alert('Compra anulada correctamente');
      window.location.reload();
    } else {
      window.alert('Ha ocurrido un error al anular la compra');
    }
  }

  return (
    <div className='container'>
      <TransactionFilter
        onFilter={fetchPurchaseList}
      />
      <TransactionList
        transactions={transactions}
        onCancelTransaction={handleCancelPurchase}
      />
    </div>
  );
};

export default TransaccionesLlevateloView;
