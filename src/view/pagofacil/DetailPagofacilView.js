import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { fetchPaymentResume, fetchTransactionPaymentResume, fetchTransactionResume } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import moment from 'moment';
import 'moment/locale/es'

function fetchTransactionData(idOrdenPago) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchTransactionResume(idOrdenPago);
    response.then((data) => {
      if (data && data.body) {
        resolve(data.body);
      } else {
        resolve();
      }
    });
  })
  return promise;
}

function fetchTransactionPaymentData(idOrdenPago) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchTransactionPaymentResume(idOrdenPago);
    response.then((data) => {
      if (data && data.body) {
        resolve(data.body);
      } else {
        resolve();
      }
    });
  })
  return promise;
}

function fetchPaymentData(idOrdenPago) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchPaymentResume(idOrdenPago);
    response.then((data) => {
      if (data && data.body) {
        resolve(data.body);
      } else {
        resolve();
      }
    });
  })
  return promise;
}

function transformdate(dateTransform) {
  if (dateTransform) {
    let fechaTemp = new Date(dateTransform);
    let aux = moment(fechaTemp).locale('es').format('LLL');
    return aux;
  } else {
    return null;
  }
}

function transformDateHour(dateTransform) {
  if (dateTransform) {
    let fechaTemp = new Date(dateTransform);
    return moment(fechaTemp).locale('es').format('LLL')
  } else {
    return null;
  }
}

function DetailPagoFacil(props) {
  const [infoDetail, setInfoDetail] = useState({});

  useEffect(() => {
    async function getData() {
      let dataDetail = {};

      let transactionData = await fetchTransactionData(props.idOrdenPago);
      if (transactionData) {
        dataDetail.id = props.idOrdenPago;
        dataDetail.value = transactionData.value;
        dataDetail.sequence = transactionData.sequence;
        dataDetail.paymentorderclientid = transactionData.paymentorderclientid;
        dataDetail.estado = transactionData.estado;
      }

      let paymentTxData = await fetchTransactionPaymentData(props.idOrdenPago);
      if (paymentTxData) {
        dataDetail.fechaRegistro = paymentTxData.fechaRegistro;
      }

      let histData = await fetchPaymentData(props.idOrdenPago);
      if (histData) {
        let listHist = [];
        histData.forEach(paymentData => {
          let histTx = {};
          histTx.estado = paymentData.estado;
          histTx.fechaPago = paymentData.fechaPago;
          histTx.medioPago = paymentData.medioPago;
          histTx.secuencia = paymentData.secuencia;
          histTx.valor = paymentData.valor;
          histTx.codigoBanco = paymentData.codigoBanco;
          if (paymentData.idComprador && paymentData.idComprador !== '') {
            let buyer = {
              id: paymentData.idComprador,
              name: paymentData.nombreCLiente,
              documentNumber: paymentData.numeroDocumeno,
              address: paymentData.direccion,
              city: paymentData.ciudad,
              managed: (paymentData.gestionado ? (paymentData.gestionado.toUpperCase() === 'GESTIONADO') : false)
            };
            dataDetail.buyer = buyer;
          }
          listHist.push(histTx);
        });
        dataDetail.hist = listHist;
      }

      setInfoDetail(dataDetail);
    }
    getData();
  }, [])

  return (
    <React.Fragment>
      <div className='modal-container'>
        <div className='modal-box col-md-6 col-sm-12 px-0'>
          <div className='modal-header px-0 justify-content-end px-2'>
            <button onClick={() => {
              if (props.onClose) {
                props.onClose()
              }
            }}>
              Cerrar
            </button>
          </div>
          <div className='modal-content px-4'>
            <div className='row mx-0'>

              <p className='col-12 px-0 modal-title mb-4'>
                Detalle del movimiento
              </p>

              <div className='col-5 box-radius box-shadow box-style'>
                <FieldForm
                  label='Monto'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={infoDetail.value ? '$ ' + infoDetail.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : ''}
                />

                {infoDetail.estado &&
                  <div className={`my-2 status-box ${infoDetail.estado.toUpperCase() === 'CREATED' ? 'box-created' : infoDetail.estado.toUpperCase() === 'COMPLETED' ? 'box-approve' : 'box-rejected'}`} >
                    {infoDetail.estado.toUpperCase() === 'CREATED' ? 'Registrado' : infoDetail.estado.toUpperCase() === 'COMPLETED' ? 'Pagado' : 'Rechazada'}
                  </div>
                }

                <FieldForm
                  label='Fecha y Hora'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={transformdate(infoDetail.fechaRegistro)}
                />

                <FieldForm
                  label='Tipo de transacción'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value='Venta'
                />

                <FieldForm
                  label='Método'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value='PagoFácil'
                />

                <FieldForm
                  label='Referencia'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={infoDetail.sequence}
                />
              </div>

              {infoDetail.buyer &&
                <div className='col-7 px-5'>
                  <p className='col-12 px-0 modal-subtitle'>
                    Gestión de servicio o producto
                  </p>

                  <FieldForm
                    label='Cliente'
                    readOnly={true}
                    customStyle='my-3'
                    value={infoDetail.buyer.name}
                  />

                  <FieldForm
                    label='No. Documento'
                    readOnly={true}
                    customStyle='my-3'
                    value={infoDetail.buyer.documentNumber}
                  />

                  <FieldForm
                    label='Dirección'
                    readOnly={true}
                    customStyle='my-3'
                    value={infoDetail.buyer.address}
                  />

                  <FieldForm
                    label='Ciudad'
                    readOnly={true}
                    customStyle='my-3'
                    value={infoDetail.buyer.city}
                  />

                  {/* GESTIONADO CHECKBOX */}

                </div>
              }
            </div>

            {infoDetail.hist &&
              <div className='row my-3'>
                <p className='col-12 modal-subtitle'>
                  Historial de intento de pago
                </p>

                <div className='col-12 list-modal'>
                  {infoDetail.hist.map(detail => {
                    return (
                      <div className='row list-modal-row border-bottom'>
                        <div className='col-3'>
                          {transformDateHour(detail.fechaPago)}
                        </div>

                        <div className='col-3'>
                          {detail.codigoBanco}
                        </div>

                        <div className='col-3'>
                          {detail.medioPago}
                        </div>

                        <div className='col-3'>
                          <div className={`my-2 modal-status-box ${infoDetail.estado.toUpperCase() === 'CREATED' ? 'box-created' : infoDetail.estado.toUpperCase() === 'COMPLETED' ? 'box-approve' : 'box-rejected'}`} >
                            {detail.estado.toUpperCase() === 'CREATED' ? 'Registrado' : infoDetail.estado.toUpperCase() === 'COMPLETED' ? 'Pagado' : 'Rechazada'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <style jsx>
        {
          `
            .modal-container{
              border:0;
              background-color:rgba(0,0,0,0.3);
              z-index:100;
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
              position: fixed;
              top:0;
              left:0;
              right:0;
              bottom:0;
              display:flex;
              justify-content:center;
              align-items:center;
            }

            .modal-box {
              background-color:white;
              z-index:100;
              padding: 1rem 2rem;
              border: none;
              border-radius: 8px;
              box-shadow: #c1c1c1 0px 2px 6px;
            }

            .modal-content{
              border: none !important;
              text-align:left;
              max-height: 80vh;
              overflow-y: auto;
            }

            .modal-content-children{
                text-align:left;
                display:flex;
                flex-direction:column;
            }

            .footer{
                margin-top:1rem;
                margin-bottom:1rem;
            }
          `
        }
      </style>
    </React.Fragment >
  )
}

export { DetailPagoFacil };