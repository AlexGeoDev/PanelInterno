import React, { useEffect, useState } from 'react';
import { fetchActiveCommerce, sendPushNotification } from '../../business/PagofacilBusiness';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { Loading } from '../../components/loading/Loading';

function fetchActiveMerchant() {
  const promise = new Promise((resolve, reject) => {
    let response = fetchActiveCommerce();
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

function PushNotification(props) {
  let notifyInit = {
    typeMessage: 'TEXT',
    body: null,
    link: null,
    urlImage: null
  }

  const [listActiveMerchant, setListActiveMerchant] = useState([]);
  const [merchantCode, setMerchantCode] = useState(null);
  const [email, setEmail] = useState(null);
  const [notifyData, setNotifyData] = useState(notifyInit);
  const [imgAttachment, setImgAttachment] = useState(false);
  const [massive, setMassive] = useState(true);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);

    const promiseActiveMerchant = new Promise(async (resolve, reject) => {
      let data = await fetchActiveMerchant();
      if (data) {
        console.log(data);

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
          alert('Se ha enviado la notificación correctamente');
        } else {
          alert('Se ha presentado un error al enviar la notificación');
        }
        resolve();
      }
    });

    Promise.all([promiseActiveMerchant]).then(value => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <React.Fragment>
      {loading &&
        <Loading />
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
              label='Link a Enviar'
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
        <div className='row mt-3 justify-content-center'>
          <div className='col-12'>
            <h5>
              Enviar A:
          </h5>
          </div>

          <div className='col-lg-5 col-md-6 col-sm-12'>
            <FieldForm
              label='MerchantCode'
              type='autocomplete'
              value={merchantCode}
              onChangeValue={setMerchantCode}
              listElements={listActiveMerchant}
              field='merchantcode'
            />
          </div>

          <div className='col-lg-5 col-md-6 col-sm-12'>
            <FieldForm
              label='Email'
              value={email}
              onChangeValue={setEmail}
            />
          </div>
        </div>
      }

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            onClick={() => {
              if (notifyData.body === null || notifyData.body === '') {
                alert('Se debe ingresar el mensaje de la notificación')
              } else if (!massive && ((merchantCode == null || merchantCode == '') || (email == null || email == ''))) {
                alert('Se debe especificar a que comercio se debe enviar la notificación')
              } else {
                sendNotify()
              }
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export { PushNotification };
