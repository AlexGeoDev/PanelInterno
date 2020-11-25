import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { fetchPaymentList } from '../../business/PanelInternoBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { Loading } from '../../components/loading/Loading';
import { DetailPayment } from './DetailPayment';

function PaymentInfo(props) {
  const [openModal, setOpenModal] = useState(false);
  const [detailPayment, setDetailPayment] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterInfo, setFilterInfo] = useState(
    {
      email: null,
      date: null,
      status: null
    }
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  let fetchInfo = () => {
    let payload = {};
    if (filterInfo.email !== null) {
      payload.email = filterInfo.email;
    }

    if (filterInfo.date !== null) {
      debugger
      payload.date = filterInfo.date !== null ? moment(filterInfo.date).format('yyyy-MM-DD') : null;
    }

    if (filterInfo.status !== null) {
      payload.status = filterInfo.status;
    }

    setLoading(true);
    let response = fetchPaymentList(payload);
    response.then((value) => {
      value.json().then(bodyResponse => {
        setLoading(false);
        let listData = bodyResponse.data;
        setData(listData);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      })
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }

  const formatCurrency = (value) => {
    return '$ ' + value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }

  const formatStatus = (status) => {
    return status === 'IN_PROCESS' ? 'En Proceso' : 'Completado';
  }

  return (
    <div>
      {openModal &&
        <DetailPayment
          infoPayment={detailPayment}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      }

      {loading &&
        <Loading />
      }

      <div className='mt-4'>
        <div className='row justify-content-center mb-3'>
          <div className='col-5 mb-3'>
            <FieldForm
              label='Correo'
              value={filterInfo.email}
              onChangeValue={(value) => {
                let infoTemp = { ...filterInfo };
                infoTemp.email = value;
                setFilterInfo(infoTemp);
              }}
            />
          </div>

          <div className='col-5 mb-3'>
            <FieldForm
              type='date'
              label='Fecha'
              value={filterInfo.date}
              onChangeValue={(value) => {
                let infoTemp = { ...filterInfo };
                infoTemp.date = value;
                setFilterInfo(infoTemp);
              }}
            />
          </div>

          <div className='col-5 mb-3'>
            <FieldForm
              label='Estado'
              type='select'
              value={filterInfo.status}
              onChangeValue={(filter) => {
                let infoTemp = { ...filterInfo };
                infoTemp.status = filter;
                setFilterInfo(infoTemp);
              }}
              listElements={[
                { value: 'IN_PROCESS', label: 'En Proceso' },
                { value: 'SUCCESS', label: 'Completado' }
              ]}
            />
          </div>

          <div className='col-5' />
        </div>

        <button
          onClick={() => {
            fetchInfo()
          }}
        >
          Consultar
        </button>
      </div>

      <div className='d-flex flex-column w-100 mt-4'>
        <div
          className='row mx-0 align-items-center border-bottom justify-content-between mb-3 pb-2'
        >
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Nombre
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Identificacion
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Correo
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Ciudad
          </span>

          <span
            className='col px-2 text-left font-weight-bold'
          >
            Celular
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Valor
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Metodo de Pago
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Estado del Pago
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
            Fecha de Creacion
          </span>
          <span
            className='col px-2 text-left font-weight-bold'
          >
          </span>
        </div>
        {data &&
          data.map((element, index) => (
            <div
              key={index}
              className='row mx-0 align-items-center border-bottom justify-content-between mb-3 pb-2'
            >
              <span
                className='col px-2 text-left'
              >
                {element.clientType === 'natural' ? element.clientName + ' ' + element.clientLastNames : element.clientName}
              </span>
              <span
                className='col px-2 text-left'
              >
                {element.clientIdNumber}
              </span>
              <span
                className='col px-2 text-left'
              >
                {element.clientEmail}
              </span>
              <span
                className='col px-2 text-left'
              >
                {element.clientCity}
              </span>

              <span
                className='col px-2 text-left'
              >
                {element.clientPhone}
              </span>
              <span
                className='col px-2 text-left'
              >
                {formatCurrency(element.amount)}
              </span>
              <span
                className='col px-2 text-left'
              >
                {element.paymentMethod}
              </span>
              <span
                className='col px-2 text-left'
              >
                {formatStatus(element.paymentStatus)}
              </span>
              <span
                className='col px-2 text-left'
              >
                {element.dateCreate}
              </span>

              <button
                className='col px-2 btn-detail'
                onClick={() => {
                  setDetailPayment(element);
                  setOpenModal(true);
                }}
              >
                Detalle
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { PaymentInfo };
