import React, { useState } from 'react';
import { fetchDataInfo, fetchInfoRegister } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { ModalConfirm } from '../../components/modalConfirm/ModalConfirm';

function VerifyInfo(props) {
  const [merchantCode, setMerchantCode] = useState();
  const [info, setInfo] = useState([]);
  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: '',
    message: '',
    onAccept: null
  });

  let fetchData = (email, serial) => {
    const promise = new Promise((resolve, reject) => {
      let response = fetchDataInfo(email, serial)
      response.then((data) => {
        if (data && data.body) {
          resolve(data.body);
        } else {
          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Error';
          infoModal.message = 'Para los filtros ingresados no se encontraron datos';
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);
          resolve();
        }
      })
    })
    return promise;
  }

  return (
    <React.Fragment>
      {confirmInfo.showModal &&
        <ModalConfirm
          title={confirmInfo.title}
          message={confirmInfo.message}
          onAccept={confirmInfo.onAccept}
        />
      }

      <div className='row justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='MerchantCode'
            value={merchantCode}
            onChangeValue={setMerchantCode}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            onClick={async () => {
              let data = await fetchData(merchantCode);
              setInfo(data);
            }}
          >
            Consultar
          </button>
        </div>
      </div>

      {info && info.length > 0 &&
        <div className='row justify-content-center align-items-center mt-4'>
          <div className='col-10'>
            <p className='px-0 modal-subtitle'>
              Información
            </p>
            <div
              className='d-flex justify-content-center'
            >
              <div
                style={{ display: 'table' }}
              >
                <div
                  className='table-header'
                >
                  <div
                    className='table-cell'
                  >
                    Correo
                </div>

                  <div
                    className='table-cell'
                  >
                    Rol
                </div>

                  <div
                    className='table-cell'
                  >
                    OperatorCode
                </div>
                </div>

                {
                  info.map((element, key) => {
                    return (
                      <div
                        key={key}
                        style={{ display: 'table-row' }}
                      >
                        <div
                          className='table-cell'
                        >
                          {element.email}
                        </div>

                        <div
                          className='table-cell'
                        >
                          {element.rol}
                        </div>

                        <div
                          className='table-cell'
                        >
                          {element.operator}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export { VerifyInfo };