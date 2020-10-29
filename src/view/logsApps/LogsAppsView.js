import React, { useState } from 'react';
import { Loading } from '../../components/loading/Loading';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { fetchTransactionTrace } from '../../business/LoginUnifiedBusiness';
import { ModalConfirm } from '../../components/modalConfirm/ModalConfirm';

function LosgAppsView(props) {
  const [loading, setLoading] = useState(false);
  const [sequenceInfo, setSequenceInfo] = useState(null);
  const [data, setData] = useState([]);

  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: '',
    message: '',
    onAccept: null
  });

  let fetchTrace = () => {
    if (sequenceInfo === null || sequenceInfo === '') {
      return;
    }

    let response = fetchTransactionTrace(sequenceInfo);
    setLoading(true);
    response.then((value) => {
      value.json().then(data => {
        setLoading(false);
        if (data.header.estadoPeticion) {
          setData(data.body);
        } else {
          let error = data.header.codigoError;
          if (error) {
            let mensajeModal = null;

            if (error === 'MERCHANT_NOT_FOUND') {
              mensajeModal = 'No se ha encontrado un MerchantCode asociado a la secuencia ingresada';
            } else if (error === 'FILE_NOT_FOUND') {
              mensajeModal = 'No se ha encontrado el archivo de logs';
            } else if (error === 'FETCH_LOGS_EXCEPTION') {
              mensajeModal = 'Se ha generado una excepcion al consultar los logs';
            } else if (error === 'SEQUENCE_REQUIRED') {
              mensajeModal = 'La secuencia es requerida';
            }

            let infoModal = { ...confirmInfo };
            infoModal.showModal = true;
            infoModal.title = 'Error';
            infoModal.message = mensajeModal;
            infoModal.onAccept = () => {
              let infoCerrar = { ...confirmInfo };
              infoCerrar.showModal = false;
              setConfirmInfo(infoCerrar);
            }
            setConfirmInfo(infoModal);
          }
        }
      }).catch(err => {
        console.error(err);
        setLoading(false);
      })
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }

  return (
    <div>
      {loading &&
        <Loading />
      }

      {confirmInfo.showModal &&
        <ModalConfirm
          title={confirmInfo.title}
          message={confirmInfo.message}
          onAccept={confirmInfo.onAccept}
          onCancel={confirmInfo.onCancel}
        />
      }

      <div className='mt-4'>
        <div className='row justify-content-center mb-3'>
          <div className='col-5'>
            <FieldForm
              label='Secuencia'
              value={sequenceInfo}
              onChangeValue={(value) => {
                setSequenceInfo(value);
              }}
            />
          </div>
        </div>

        <button
          onClick={() => {
            fetchTrace()
          }}
        >
          Consultar
        </button>
      </div>

      <div className='log-box mt-4'>
        {data &&
          data.map((element, index) => (
            <div
              key={index}
            >
              {element}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { LosgAppsView }