import React, { useRef, useState } from 'react';
import moment from 'moment';
import loading from '../../lib/ui/loading/';
import AccountBusiness from '../../business/AccountBusiness';
import './reporte-retenciones.css'

const getPeriodDate = (period, year) => {
  let periodStartDate, periodEndDate;

  switch (period) {
    case '1':
      periodStartDate = '01-01';
      periodEndDate = `02-${moment([year]).isLeapYear() ? '29' : '28'}`;
      break;
    case '2':
      periodStartDate = '03-01';
      periodEndDate = '04-30';
      break;
    case '3':
      periodStartDate = '05-01';
      periodEndDate = '06-30';
      break;
    case '4':
      periodStartDate = '07-01';
      periodEndDate = '08-31';
      break;
    case '5':
      periodStartDate = '09-01';
      periodEndDate = '10-31';
      break;
    default:
      periodStartDate = '11-01';
      periodEndDate = '12-31';
      break;
  }
  const startDate = `${year}-${periodStartDate}`;
  const endDate = `${year}-${periodEndDate}`;

  return { startDate, endDate };
}

const ReporteRetenciones = () => {
  const [hasError, setErrorStatus] = useState(false);
  const [reportType, setReportType] = useState('retencion');
  const merchantInputRef = useRef(null);
  const yearRef = useRef(null);
  const periodRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const year = yearRef.current.value;
    const userName = merchantInputRef.current.value;
    let startDate = `${year}-01-01`;
    let endDate = `${year}-12-31`;


    if (reportType === 'ica') {
      let period = periodRef.current.value;

      const periodDate = getPeriodDate(period, year);
      startDate = periodDate.startDate;
      endDate = periodDate.endDate;
    }

    const body = {
      userName,
      startDate,
      endDate,
      reportType,
    };

    loading.showLoadingScreen();
    const success = await AccountBusiness.descargarReporteComisiones(body);
    loading.hideLoadingScreen();

    merchantInputRef.current.value = '';

    if (!success) {
      setErrorStatus(true);

      setTimeout(() => {
        setErrorStatus(false);
      }, 3000);
    }
  }

  return (
    <div className='retenciones-container'>
      <h3>Descargar reporte de retenciones</h3>
      <form
        className='form-retenciones'
        onSubmit={handleSubmit}
      >
        <div>
          <label>Tipo de reporte</label>
          <select
            onChange={(e) => setReportType(e.target.value)}
            value={reportType}
            className='ml-1'
          >
            <option value='retenciones'>Retenciones</option>
            <option value='ica'>ICA</option>
          </select>
        </div>
        {
          reportType === 'ica' &&
          <div className='mt-2'>
            <label>Periodo</label>
            <select className='ml-1' ref={periodRef}>
              <option value='1'>ENERO - FEBRERO</option>
              <option value='2'>MARZO - ABRIL</option>
              <option value='3'>MAYO - JUNIO</option>
              <option value='4'>JULIO - AGOSTO</option>
              <option value='5'>SEPTIEMBRE - OCTUBRE</option>
              <option value='6'>NOVIEMBRE - DICIEMBRE</option>
            </select>
          </div>
        }
        <div>
          <label className='mt-2'>Año</label>
          <select ref={yearRef} className='ml-1'>
            {reportType === 'ica' &&
              <option value='2021'>2021</option>
            }
            <option value='2020'>2020</option>
            <option value='2019'>2019</option>
            <option value='2018'>2018</option>
          </select>
        </div>
        <label htmlFor='username'>
          Ingrese el merchant code
        </label>
        <input
          id='username'
          type='text'
          ref={merchantInputRef}
          required
        />
        {
          hasError &&
          <span className='export-error'>
            Ha ocurrido un error, es posible que el merchant code sea incorrecto
          </span>
        }

        <button
          type='submit'
        >
          Descargar
        </button>
      </form>
    </div>
  );
}

export default ReporteRetenciones;
