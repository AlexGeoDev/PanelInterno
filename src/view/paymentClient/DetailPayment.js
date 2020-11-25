import 'moment/locale/es';
import React from 'react';
import { FieldForm } from '../../components/fieldForm/FieldForm';

function DetailPayment(props) {
  const formatCurrency = (value) => {
    return '$ ' + value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }

  const formatStatus = (status) => {
    return status === 'IN_PROCESS' ? 'En Proceso' : 'Completado';
  }

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
              <p className='col-12 modal-title px-0 my-3'>
                Detalle del Pago
              </p>

              <div className='col-md-6 col-12 px-3'>
                <FieldForm
                  label='Nombre'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={props.infoPayment.clientType === 'natural' ? props.infoPayment.clientName + ' ' + props.infoPayment.clientLastNames : props.infoPayment.clientName}
                />

                <FieldForm
                  label='Identificacion'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={props.infoPayment.clientIdNumber}
                />

                <FieldForm
                  label='Correo'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={props.infoPayment.clientEmail}
                />

                <FieldForm
                  label='Ciudad'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={props.infoPayment.clientCity}
                />

                <FieldForm
                  label='Direccion'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={`${props.infoPayment.clientAddress} ${props.infoPayment.clientAddressDetail ? props.infoPayment.clientAddressDetail : ''}`}
                />

                <FieldForm
                  label='Celular'
                  horizontal={true}
                  readOnly={true}
                  customStyle='my-3'
                  value={props.infoPayment.clientPhone}
                />
              </div>

              <div className='col-md-6 col-12 px-3'>
                <FieldForm
                  label='Valor'
                  readOnly={true}
                  horizontal={true}
                  customStyle='my-3'
                  value={formatCurrency(props.infoPayment.amount)}
                />

                <FieldForm
                  label='Metodo de Pago'
                  readOnly={true}
                  horizontal={true}
                  customStyle='my-3'
                  value={props.infoPayment.paymentMethod}
                />

                <FieldForm
                  label='Cupon'
                  readOnly={true}
                  horizontal={true}
                  customStyle='my-3'
                  value={props.infoPayment.discountCoupon ? props.infoPayment.discountCoupon : 'N/A'}
                />

                <FieldForm
                  label='Estado del Pago'
                  readOnly={true}
                  horizontal={true}
                  customStyle='my-3'
                  value={formatStatus(props.infoPayment.paymentStatus)}
                />

                <FieldForm
                  label='Fecha'
                  readOnly={true}
                  horizontal={true}
                  customStyle='my-3'
                  value={props.infoPayment.dateCreate}
                />
              </div>
            </div>

            {props.infoPayment.idShipping &&
              <div className='row mx-0 my-3'>
                <p className='col-12 modal-title px-0 my-3'>
                  Detalle del Envio
                </p>

                <FieldForm
                  label='Nombre'
                  readOnly={true}
                  customStyle='col-12 my-3'
                  value={props.infoPayment.names}
                />

                <FieldForm
                  label='Departamento'
                  readOnly={true}
                  customStyle='col-6 my-3'
                  value={props.infoPayment.department}
                />

                <FieldForm
                  label='Ciudad'
                  readOnly={true}
                  customStyle='col-6 my-3'
                  value={props.infoPayment.city}
                />

                <FieldForm
                  label='Telefono'
                  readOnly={true}
                  customStyle='col-6 my-3'
                  value={props.infoPayment.phone}
                />

                <FieldForm
                  label='Direccion'
                  readOnly={true}
                  customStyle='col-6 my-3'
                  value={props.infoPayment.address}
                />
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

export { DetailPayment };
