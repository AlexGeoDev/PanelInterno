import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchBlackListLog } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { Loading } from '../../components/loading/Loading';

const LogsListasNegrasView = () => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();

    fetchLogs(date);
  }

  const fetchLogs = async (filterDate = null) => {
    if (filterDate === null) {
      filterDate = new Date();
    }

    setLoadingStatus(true);

    const response = await fetchBlackListLog(
      moment(filterDate).format('yyyy-MM-DD'),
    );
    setLoadingStatus(false);

    if (response && response.body) {
      setLogList(response.body);
    } else {
      alert('Ha ocurrido al consultar el log');
    }
  }

  return (
    <div className='container'>
      {
        isLoading &&
        <Loading />
      }
      <h5 className='text-left mb-4'>
        Logs de intentos de pago en PagoFácil con tarjetas en la lista negra
      </h5>

      <form onSubmit={handleFilter}>
        <div className='row'>
          <FieldForm
            type='date'
            label='Fecha'
            customStyle='col-md-6'
            value={date}
            onChangeValue={(value) => setDate(value)}
          />
        </div>
        <div className='text-left mt-2'>
          <button
            className='btn btn-primary'
            type='submit'
          >
            Consultar
          </button>
        </div>
      </form>

      <div className='text-left mt-3'>
        {
          logList.map((log, i) =>
            <div key={i} className='mb-2'>
              {log}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default LogsListasNegrasView;
