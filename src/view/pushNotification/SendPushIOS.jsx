import React, { useState } from 'react';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { ModalConfirm } from '../../components/modalConfirm/ModalConfirm';
import { CSVReader } from 'react-papaparse';
import { ModalConfirmList } from '../../components/modalConfirm/ModalConfirmList';
import { sendPushNotification } from '../../business/PagofacilBusiness';

function SendPushIOS(props) {
  const { listMerchant, onLoading } = props;
  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const [uploadFileError, setUploadFileError] = useState(
    {
      showModal: false,
      listErrors: []
    }
  );
  const [pushBody, setPushBody] = useState(
    {
      title: null,
      sound: true,
      typeMessage: 'TEXT',
      body: null,
      link: null,
      massiveNotification: false,
      attachImg: false,
      urlImage: null
    }
  );
  const [confirmUser, setConfirmUser] = useState(
    {
      show: false,
      title: '',
      message: '',
      onAccept: null
    }
  );

  let handleOnDrop = (data) => {
    let listMerch = [];
    let listError = [];
    data.forEach((element) => {
      let merchAux = element.data[0];
      if (merchAux.trim() !== '') {
        if (listMerchant.findIndex(merchant => merchant.value === merchAux) !== -1) {
          listMerch.push(merchAux);
        } else {
          listError.push(merchAux);
        }
      }
    });

    setSelectedMerchant(listMerch);
    if (listError.length > 0) {
      let errorTmp = { ...uploadFileError };
      errorTmp.showModal = true;
      errorTmp.listErrors = listError;
      setUploadFileError(errorTmp);
    }
  }

  let handleOnRemoveFile = (data) => {
    setSelectedMerchant([]);
    setUploadFileError({ showModal: false, listErrors: [] });
  }

  const sendPushMessage = async () => {
    onLoading(true);
    let response = await sendPushNotification(pushBody, selectedMerchant);
    onLoading(false);
    if (response) {
      console.log(response);
      if (response.body) {
        setConfirmUser({
          show: true,
          title: 'Exito!',
          message: 'Se ha enviado la notificación correctamente',
          onAccept: setConfirmUser(false)
        });
      } else {
        setConfirmUser({
          show: true,
          title: 'Error en el envio',
          message: 'Se ha presentado un error al enviar la notificación',
          onAccept: setConfirmUser(false)
        });
      }
    }
  }

  const handleSendMessage = () => {
    if (pushBody.body === null || pushBody.body === '') {
      setConfirmUser({
        show: true,
        title: 'Error',
        message: 'Se debe ingresar el mensaje de la notificación',
        onAccept: setConfirmUser(false)
      });
    } else if (!pushBody.massiveNotification && (selectedMerchant.length === 0)) {
      setConfirmUser({
        show: true,
        title: 'Error',
        message: 'Se debe especificar a que comercio se debe enviar la notificación',
        onAccept: setConfirmUser(false)
      });
    } else {
      sendPushMessage()
    }
  }

  return (
    <React.Fragment>
      {confirmUser.show &&
        <ModalConfirm
          title={confirmUser.title}
          message={confirmUser.message}
          onAccept={confirmUser.onAccept}
        />
      }

      {uploadFileError.showModal &&
        <ModalConfirmList
          title='Merchant no Encontrados'
          onAccept={() => setUploadFileError({ showModal: false, listErrors: [] })}
        >
          {uploadFileError.listErrors.map((element, index) => {
            return (
              <div
                key={index}
                className='row justify-content-center'
              >
                <div
                  className='col-4 height-cell border d-flex justify-content-center align-items-center'
                >
                  {element}
                </div>
              </div>
            )
          })}
        </ModalConfirmList>
      }

      <div className='row align-items-center flex-column mx-4'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Titulo notificación'
            customStyle='my-3'
            value={pushBody.title || ''}
            onChangeValue={(title) => {
              let data = { ...pushBody };
              data.title = title;
              setPushBody(data);
            }}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Mensaje Notificación'
            customStyle='mt-3'
            type='textArea'
            value={pushBody.body}
            onChangeValue={(message) => {
              let data = { ...pushBody };
              data.body = message;
              setPushBody(data);
            }}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <div className='d-flex align-items-center justify-content-center'>
            <label className='mb-0 mr-2 font-bold'>
              Adjuntar Imagen
            </label>
            <input
              type="checkbox"
              checked={pushBody.attachImg}
              onChange={element => {
                let data = { ...pushBody };
                data.attachImg = element.target.checked;
                setPushBody(data);
              }}
            />
          </div>

          {pushBody.attachImg &&
            <FieldForm
              label='Link Imagen'
              customStyle='my-3'
              value={pushBody.urlImage}
              onChangeValue={(link) => {
                let data = { ...pushBody };
                data.urlImage = link;
                setPushBody(data);
              }}
            />
          }
        </div>
      </div>

      <div className='row mt-3 justify-content-center'>
        <div className='d-flex align-items-center justify-content-center'>
          <label className='mb-0 mr-2 font-bold'>
            Notificación Masiva
          </label>
          <input
            type="checkbox"
            checked={pushBody.massiveNotification}
            onChange={element => {
              let data = { ...pushBody };
              data.massiveNotification = element.target.checked;
              setPushBody(data);
            }}
          />
        </div>
      </div>

      {!pushBody.massiveNotification &&
        <>
          <div className='row mt-3 justify-content-center'>
            <div className='col-12'>
              <h5>
                Enviar A:
            </h5>
            </div>

            <div className='col-lg-5 col-md-6 col-sm-12'>
              <FieldForm
                label='MerchantCode'
                type='select'
                value=''
                onChangeValue={value => {
                  let listPush = [...selectedMerchant];
                  if (listPush.indexOf(value) !== -1) {
                    listPush = listPush.filter(filter => filter !== value);
                  } else {
                    listPush.push(value);
                  }
                  setSelectedMerchant(listPush)
                }}
                listElements={listMerchant}
              />
            </div>
          </div>

          <div className='row mt-3 justify-content-center'>
            <div className='col-md-5 col-sm-12 mt-4'>
              <CSVReader
                onDrop={handleOnDrop}
                noClick
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
              >
                <span>Suelta un archivo CSV aqui para cargarlo.</span>
              </CSVReader>
            </div>
          </div>

          <div className='row mt-3 justify-content-center'>
            <div className='col-10 mt-4'>
              <div className='row justify-content-center'>
                <div className='col-4 height-cell border d-flex justify-content-center align-items-center'>
                  <span className='font-bold'>
                    MerchantCode
                </span>
                </div>
                <div className='col-2 height-cell border d-flex justify-content-center align-items-center' />
              </div>
              {selectedMerchant.map((element, index) => {
                return (
                  <div
                    key={index}
                    className='row justify-content-center'
                  >
                    <div className='col-4 height-cell border d-flex justify-content-center align-items-center'>
                      {element}
                    </div>
                    <div className='col-2 height-cell border d-flex justify-content-center align-items-center'>
                      <button
                        onClick={() => {
                          let listPush = [...selectedMerchant];
                          listPush = listPush.filter(filter => filter !== element);
                          setSelectedMerchant(listPush)
                        }}
                      >
                        Eliminar
                    </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      }

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            className='btn-send'
            onClick={() => handleSendMessage()}
          >
            Enviar
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SendPushIOS;
