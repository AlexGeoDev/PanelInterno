import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TransactionFilter from './TransactionFilter';
import TransactionList from './TransactionList';
import llevateloBusiness from '../../business/LlevateloBusiness';
import loading from '../../lib/ui/loading/';
import { subDays, endOfDay, format } from 'date-fns';
import { exportCSV } from '../../lib/utils/csv';
import { getFormattedDate } from '../../lib/utils/dateUtils';

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
    } else {
      setTransactions([]);
    }
  };

  const handleCancelPurchase = async (idPurchase) => {
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

  const handleDownloadCSV = () => {
    if (transactions.length === 0) {
      window.alert('No hay datos para exportar');
      return;
    }

    const csvData = transactions.map((transaction) => {
      delete transaction.id;
      delete transaction.idClientLlevatelo;
      delete transaction.idUsuario;
      delete transaction.idClient;
      delete transaction.stateFilter;
      delete transaction.listCompras;
      delete transaction.fechaInicio;
      delete transaction.fechaFinal;
      delete transaction.notInList;
      delete transaction.operatorCode;
      delete transaction.idTransaction;
      delete transaction.cupoMaximo;

      transaction.fechaCompra = getFormattedDate(transaction.fechaCompra);
      transaction.cantidadDias = transaction.cantidadDias || 0;
      transaction.intereses = transaction.intereses || 0;

      return transaction;
    });

    exportCSV(csvData, `cupo-cajero-${new Date().getTime()}`);
  }

  return (
    <div className='container'>
      <h3>Transacciones de Cupo Cajero</h3>
      <TransactionFilter
        onFilter={fetchPurchaseList}
        onDownloadCSV={handleDownloadCSV}
      />
      <TransactionList
        transactions={transactions}
        onCancelTransaction={handleCancelPurchase}
      />
    </div>
  );
};

export default TransaccionesLlevateloView;
