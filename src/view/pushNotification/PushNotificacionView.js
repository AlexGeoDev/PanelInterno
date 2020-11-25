import React, { useEffect, useState } from 'react';
import { fetchCommerces, sendPushNotification } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { Loading } from '../../components/loading/Loading';
import { ModalConfirm } from '../../components/modalConfirm/ModalConfirm';
import { CSVReader } from 'react-papaparse';
import { ModalConfirmList } from '../../components/modalConfirm/ModalConfirmList';

function fetchMerchants() {
  const promise = new Promise((resolve, reject) => {
    let response = fetchCommerces();
    response.then((data) => {
      if (data && data.body) {
        let listData = [];
        for (let index in data.body) {
          let element = data.body[index];
          let merchantInfo = {
            value: element.merchantcode,
            label: element.merchantcode
          }
          listData.push(merchantInfo);
        }
        resolve(listData);
      } else {
        resolve([]);
      }
    })
  })
  return promise;
}

function PushNotification(props) {
  let notifyInit = {
    title: null,
    sound: false,
    typeMessage: 'TEXT',
    body: null,
    link: null,
    urlImage: null
  }

  const [listActiveMerchant, setListActiveMerchant] = useState([]);
  const [merchantError, setMerchantError] = useState([]);
  const [modalError, setModalError] = useState(false);
  const [merchantCode, setMerchantCode] = useState([]);
  const [email, setEmail] = useState(null);
  const [notifyData, setNotifyData] = useState(notifyInit);
  const [imgAttachment, setImgAttachment] = useState(false);
  const [massive, setMassive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmUser, setConfirmUser] = useState({ show: false });

  const getData = () => {
    setLoading(true);

    const promiseActiveMerchant = new Promise(async (resolve, reject) => {
      let data = await fetchMerchants();
      if (data) {
        setListActiveMerchant(data);
        resolve();
      } else {
        resolve();
      }
    });

    Promise.all([promiseActiveMerchant]).then(value => setLoading(false));
  }

  const sendNotify = () => {
    setLoading(true);

    const promiseActiveMerchant = new Promise(async (resolve, reject) => {
      let response = await sendPushNotification(notifyData, merchantCode, email);
      if (response) {
        console.log(response);
        if (response.body) {
          let confirm = {};
          confirm.show = true;
          confirm.title = 'Exito!';
          confirm.message = 'Se ha enviado la notificación correctamente';
          confirm.onAccept = closeConfirm;
          setConfirmUser(confirm);
        } else {
          let confirm = {};
          confirm.show = true;
          confirm.title = 'Error en el envio';
          confirm.message = 'Se ha presentado un error al enviar la notificación';
          confirm.onAccept = closeConfirm;
          setConfirmUser(confirm);
        }
        resolve();
      }
    });

    Promise.all([promiseActiveMerchant]).then(value => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, [])

  let closeConfirm = () => {
    setConfirmUser(false);
  }

  let handleOnDrop = (data) => {
    let listMerch = [];
    let listError = [];
    data.map((element) => {
      let merchAux = element.data[0];
      if (merchAux.trim() !== '') {
        if (listActiveMerchant.findIndex(merchant => merchant.value === merchAux) != -1) {
          listMerch.push(merchAux);
        } else {
          listError.push(merchAux);
        }
      }
    });
    setMerchantCode(listMerch);
    setMerchantError(listError);
    if (listError.length > 0) {
      setModalError(true)
    }
  }

  let handleOnRemoveFile = (data) => {
    setMerchantCode([]);
    setMerchantError([]);
  }

  return (
    <React.Fragment>
      {loading &&
        <Loading />
      }

      {confirmUser.show &&
        <ModalConfirm
          title={confirmUser.title}
          message={confirmUser.message}
          onAccept={confirmUser.onAccept}
        />
      }

      {modalError &&
        <ModalConfirmList
          title='Merchant no Encontrados'
          onAccept={() => {
            setModalError(false);
          }}
        >
          {merchantError.map((element, index) => {
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

      <div className='row justify-content-center'>
        <div className='col-md-5 col-sm-12'>
          <FieldForm
            label='Tipo Notificación'
            type='select'
            customStyle='my-3'
            value={notifyData.typeMessage}
            onChangeValue={(type) => {
              let data = { ...notifyData };
              data.typeMessage = type;
              setNotifyData(data);
            }}
            listElements={[
              { value: 'TEXT', label: 'Texto' },
              { value: 'LINK', label: 'Link' }
            ]}
          />
        </div>

        <div className='col-md-5 col-sm-12'>
          {notifyData.typeMessage === 'LINK' &&
            <FieldForm
              label='Link a Enviar (Solo Android)'
              customStyle='my-3'
              value={notifyData.link}
              onChangeValue={(link) => {
                let data = { ...notifyData };
                data.link = link;
                setNotifyData(data);
              }}
            />
          }
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Titulo notificación (iOS)'
            customStyle='my-3'
            value={notifyData.title || ''}
            onChangeValue={(title) => {
              let data = { ...notifyData };
              data.title = title;
              setNotifyData(data);
            }}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12 d-flex align-items-center justify-content-center'>
          <div className=''>
            <label className='mb-0 mr-2 font-bold'>
              Notificación con sonido (iOS)
            </label>
            <input
              type='checkbox'
              checked={notifyData.sound}
              onChange={(e) => {
                console.log('ISISIS')
                let data = { ...notifyData };
                data.sound = e.target.checked;
                console.log(data)
                setNotifyData(data);
              }}
            />
          </div>
        </div>
      </div>

      <div className='row mt-3 justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Mensaje Notificación'
            customStyle='my-3'
            type='textArea'
            value={notifyData.body}
            onChangeValue={(message) => {
              let data = { ...notifyData };
              data.body = message;
              setNotifyData(data);
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
              checked={imgAttachment}
              onChange={element => {
                setImgAttachment(element.target.checked);
              }}
            />
          </div>

          {imgAttachment &&
            <FieldForm
              label='Link Imagen'
              customStyle='my-3'
              value={notifyData.urlImage}
              onChangeValue={(link) => {
                let data = { ...notifyData };
                data.urlImage = link;
                setNotifyData(data);
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
            checked={massive}
            onChange={element => {
              setMassive(element.target.checked);
            }}
          />
        </div>
      </div>

      {!massive &&
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
                  let listPush = [...merchantCode];
                  if (listPush.indexOf(value) != -1) {
                    listPush = listPush.filter(filter => filter !== value);
                  } else {
                    listPush.push(value);
                  }
                  setMerchantCode(listPush)
                }}
                listElements={listActiveMerchant}
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
              {merchantCode.map((element, index) => {
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
                          let listPush = [...merchantCode];
                          listPush = listPush.filter(filter => filter !== element);
                          setMerchantCode(listPush)
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
            onClick={() => {
              if (notifyData.body === null || notifyData.body === '') {
                let confirm = {};
                confirm.show = true;
                confirm.title = 'Error';
                confirm.message = 'Se debe ingresar el mensaje de la notificación';
                confirm.onAccept = closeConfirm;
                setConfirmUser(confirm);
              } else if (!massive && (merchantCode.length === 0)) {
                let confirm = {};
                confirm.show = true;
                confirm.title = 'Error';
                confirm.message = 'Se debe especificar a que comercio se debe enviar la notificación';
                confirm.onAccept = closeConfirm;
                setConfirmUser(confirm);
              } else {
                sendNotify()
              }
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </React.Fragment >
  )
}

export { PushNotification };
