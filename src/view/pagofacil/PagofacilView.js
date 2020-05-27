import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { fetchPagofacilList, fetchActiveCommerce } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { TableComponent } from '../../components/table/TableComponent';
import { DetailPagoFacil } from './DetailPagofacilView';
import { Loading } from '../../components/loading/Loading';

function transformData(data, setIdOrdenPago, setOpenModal) {
  data.forEach(info => {
    let fechaTemp = new Date(info.fechaRegistro);
    info.fechaRegistro = moment(fechaTemp).locale('es').format('LLL');
    info.estado = info.estado.toUpperCase() === 'CREATED' ? 'Registrado' : info.estado.toUpperCase() === 'COMPLETED' ? 'Pagado' : info.estado;
    info.valor = '$ ' + info.valor.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    info.option = {
      action: 'Detalle',
      event: (item) => showDetail(item, setIdOrdenPago, setOpenModal)
    }
  })
  return data;
}

function showDetail(infoPagofacil, setIdOrdenPago, setOpenModal) {
  setIdOrdenPago(infoPagofacil.idOrdenPago);
  setOpenModal(true);
}

function assignDateFilters(dateFilter) {
  let startDate = new Date();
  let endDate = new Date();

  if (dateFilter === 'today') {
    startDate = moment().startOf('day').toDate();
    endDate = moment().endOf('day').toDate();
  }

  if (dateFilter === 'yesterday') {
    let yesterdayDate = moment().subtract(1, 'days').toDate();
    startDate = moment(yesterdayDate).startOf('day').toDate();
    endDate = moment(yesterdayDate).endOf('day').toDate();
  }

  if (dateFilter === 'lastWeek') {
    let weekStart = moment().startOf('week').toDate();
    let weekEnd = moment().endOf('week').toDate();
    startDate = moment(weekStart).startOf('day').toDate();
    endDate = moment(weekEnd).endOf('day').toDate();
  }

  if (dateFilter === 'lastMonth') {
    let monthStart = moment().startOf('month').toDate();
    let monthEnd = moment().endOf('month').toDate();
    startDate = moment(monthStart).startOf('day').toDate();
    endDate = moment(monthEnd).endOf('day').toDate();
  }

  if (dateFilter === 'year') {
    let yearStart = moment().startOf('year').toDate();
    let yearEnd = moment().endOf('year').toDate();
    startDate = moment(yearStart).startOf('day').toDate();
    endDate = moment(yearEnd).endOf('day').toDate();
  }

  if (dateFilter === 'all') {
    startDate = null;
    endDate = null;
  }

  let response = {
    startDate,
    endDate
  }
  return response;
}

function fetchData(merchantCode, sequence, bankCode, dateFilters, setIdOrdenPago, setOpenModal) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchPagofacilList(merchantCode, sequence, bankCode, dateFilters.startDate, dateFilters.endDate);
    response.then((data) => {
      if (data && data.body) {
        resolve(transformData(data.body, setIdOrdenPago, setOpenModal));
      } else {
        alert('Para los filtros ingresados no se encontraron datos')
        resolve([]);
      }
    })
  })
  return promise;
}

function fetchActiveMerchant(dateFilters) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchActiveCommerce(dateFilters.startDate, dateFilters.endDate);
    response.then((data) => {
      if (data && data.body) {
        resolve(data.body);
      } else {
        resolve([]);
      }
    })
  })
  return promise;
}

function PagoFacil(props) {
  let todayDate = moment().startOf('day').format('yyyy-MM-DD');

  const [listPagoFacil, setListPagoFacil] = useState([]);
  const [listActiveMerchant, setListActiveMerchant] = useState([]);
  const [merchantCode, setMerchantCode] = useState();
  const [dateFilter, setDateFilter] = useState('today');
  const [dateFilters, setDateFilters] = useState({ startDate: moment(todayDate).startOf('day').toDate(), endDate: moment(todayDate).endOf('day').toDate() });
  const [dateShow, setDateShow] = useState({ startDate: todayDate, endDate: todayDate });
  const [sequence, setSequence] = useState();
  const [bankCode, setBankCode] = useState();
  const [idOrdenPago, setIdOrdenPago] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDateFilters(assignDateFilters(dateFilter));
  }, [dateFilter])

  const getData = () => {
    setLoading(true);

    const promiseData = new Promise(async (resolve, reject) => {
      let data = await fetchData(merchantCode, sequence, bankCode, dateFilters, setIdOrdenPago, setOpenModal);
      if (data) {
        setListPagoFacil(data);
        resolve();
      } else {
        resolve();
      }
    });

    const promiseActiveMerchant = new Promise(async (resolve, reject) => {
      let data = await fetchActiveMerchant(dateFilters);
      if (data) {
        setListActiveMerchant(data);
        resolve();
      } else {
        resolve();
      }
    });

    Promise.all([promiseData, promiseActiveMerchant]).then(value => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, [])

  let txAprobadas = listPagoFacil.filter(registro => registro.estado === 'Pagado');
  let amountAprobadas = 0;
  txAprobadas.forEach(registro => {
    amountAprobadas += Number(registro.valor.replace('$', '').split(',').join('').trim());
  });
  amountAprobadas = amountAprobadas.toFixed(2);

  return (
    <React.Fragment>
      {openModal &&
        <DetailPagoFacil
          idOrdenPago={idOrdenPago}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      }

      {loading &&
        <Loading />
      }

      <div className='row justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Ver'
            type='select'
            customStyle='my-3'
            value={dateFilter}
            onChangeValue={(filter) => {
              setDateFilter(filter);
            }}
            listElements={[
              { value: 'today', label: 'Hoy' },
              { value: 'yesterday', label: 'Ayer' },
              { value: 'lastWeek', label: 'Última Semana' },
              { value: 'lastMonth', label: 'Último Mes' },
              { value: 'year', label: 'Año' },
              { value: 'another', label: 'Otro' },
              { value: 'all', label: 'Todos' }
            ]}
          />

          {dateFilter !== 'another' || dateFilter !== 'all' &&
            <div className='row justify-content-center'>
              {(dateFilter === 'today' || dateFilter === 'yesterday') ?
                <div>
                  {moment(dateFilters.startDate).locale('es').format('LL')}
                </div>
                :
                <div className='row justify-content-center'>
                  <div>
                    {moment(dateFilters.startDate).locale('es').format('LL')}
                  </div>

                  <span className='mx-3'>
                    a
                  </span>

                  <div>
                    {moment(dateFilters.endDate).locale('es').format('LL')}
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <div className='col-12'>
          {dateFilter === 'another' &&
            <div className='row justify-content-center'>
              <div className='col-5'>
                <FieldForm
                  label='Fecha Inicio'
                  type='date'
                  customStyle='my-3'
                  value={dateShow.startDate}
                  onChangeValue={(date) => {
                    let filters = { ...dateFilters };
                    filters.startDate = moment(date).startOf('day').toDate();
                    setDateFilters(filters);

                    let filtersUI = dateShow;
                    filtersUI.startDate = date;
                    setDateShow(filtersUI);
                  }}
                />
              </div>
              <div className='col-5'>
                <FieldForm
                  label='Fecha Final'
                  type='date'
                  customStyle='my-3'
                  value={dateShow.endDate}
                  onChangeValue={(date) => {
                    let filters = { ...dateFilters };
                    filters.endDate = moment(date).endOf('day').toDate();
                    setDateFilters(filters);

                    let filtersUI = dateShow;
                    filtersUI.endDate = date;
                    setDateShow(filtersUI);
                  }}
                />
              </div>
            </div>
          }
        </div>
      </div>

      <div className='row mt-3 justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Cantidad Comercios Activos en el Periodo'
            horizontal={true}
            readOnly={true}
            customStyle='my-3'
            value={listActiveMerchant.length}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Cantidad Transacciones Aprobadas'
            horizontal={true}
            readOnly={true}
            customStyle='my-3'
            value={txAprobadas.length}
          />

          <FieldForm
            label='Total Transacciones Aprobadas'
            horizontal={true}
            readOnly={true}
            customStyle='my-3'
            value={'$ ' + amountAprobadas.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
          />
        </div>
      </div>

      <div className='row mt-3 justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='MerchantCode'
            value={merchantCode}
            onChangeValue={setMerchantCode}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Referencia'
            value={sequence}
            onChangeValue={setSequence}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12 mt-3'>
          <FieldForm
            label='Código Banco'
            value={bankCode}
            onChangeValue={setBankCode}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            onClick={() => {
              getData();
            }}
          >
            Filtrar
          </button>
        </div>
      </div>

      <div className='row mt-4'>
        <TableComponent
          styleCols='minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr)'
          data={listPagoFacil}
          multiple={false}
          cols={[
            { label: 'Merchant Code', value: 'merchantcode' },
            { label: 'Fecha y Hora', value: 'fechaRegistro' },
            { label: 'Referencia', value: 'secuenciaOrdenPago' },
            { label: 'Estado', value: 'estado' },
            { label: 'Valor', value: 'valor' },
            { label: '', value: 'option' }
          ]}
        />
      </div>
    </React.Fragment>
  )
}

export { PagoFacil };