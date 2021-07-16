import React, { useState } from 'react';
import { FieldForm } from '../../components/fieldForm/FieldForm';
import { ModalConfirm } from '../../components/modalConfirm/ModalConfirm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { sendMassivePush, sendDirectPush, sendUnregisterPush } from '../../business/PagofacilBusiness';
import SearchPanel from './SearchPanel';
import UploadPanel from './UploadPanel';

function SendPush(props) {
  const { listMerchant, onLoading } = props;
  const [uploadPanel, setUploadPanel] = useState(false);
  const [infoSearchPanel, setInfoSearchPanel] = useState(
    {
      showPanel: false,
      selectMultiple: false
    }
  );
  const [pushBody, setPushBody] = useState(
    {
      typeNotification: 'PUBLIC',
      sendTo: 'MERCHANT',
      title: '',
      body: '',
      url: '',
      urlImage: '',
      email: '',
      listDirectPush: '',
      merchant: '',
      merchants: []
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

  const sendPushMessage = async () => {
    let bodyPush = {
      title: pushBody.title,
      body: pushBody.body
    };

    if (pushBody.url !== '') {
      bodyPush.link = pushBody.url;
    }

    if (pushBody.urlImage !== '') {
      bodyPush.urlImage = pushBody.urlImage;
    }

    onLoading(true);
    if (pushBody.typeNotification === 'PUBLIC') {
      let response = await sendMassivePush(bodyPush);
      if (response.body) {
        setConfirmUser({
          show: true,
          title: 'Exito!',
          message: 'Se ha enviado la notificación correctamente',
          onAccept: () => setConfirmUser({ show: false })
        });
      } else {
        setConfirmUser({
          show: true,
          title: 'Error en el envio',
          message: 'Se ha presentado un error al enviar la notificación',
          onAccept: () => setConfirmUser({ show: false })
        });
      }
    } else if (pushBody.typeNotification === 'DIRECT') {
      bodyPush.listDirectPush = pushBody.listDirectPush;
      let response = await sendUnregisterPush(bodyPush);
      if (response.body) {
        setConfirmUser({
          show: true,
          title: 'Exito!',
          message: 'Se ha enviado la notificación correctamente',
          onAccept: () => setConfirmUser({ show: false })
        });
      } else {
        setConfirmUser({
          show: true,
          title: 'Error en el envio',
          message: 'Se ha presentado un error al enviar la notificación',
          onAccept: () => setConfirmUser({ show: false })
        });
      }
    } else if (pushBody.typeNotification === 'PRIVATE') {
      if (pushBody.sendTo === 'EMAIL') {
        bodyPush.email = pushBody.email;
      }

      if (pushBody.sendTo === 'MERCHANT') {
        bodyPush.merchant = pushBody.merchant;
      }

      if (pushBody.sendTo === 'MERCHANTS') {
        bodyPush.merchants = pushBody.merchants;
      }
      let response = await sendDirectPush(bodyPush);
      if (response.body) {
        setConfirmUser({
          show: true,
          title: 'Exito!',
          message: 'Se ha enviado la notificación correctamente',
          onAccept: () => setConfirmUser({ show: false })
        });
      } else {
        setConfirmUser({
          show: true,
          title: 'Error en el envio',
          message: 'Se ha presentado un error al enviar la notificación',
          onAccept: () => setConfirmUser({ show: false })
        });
      }
    }
    onLoading(false);
  }

  const handleSendMessage = () => {
    let listErrors = {};
    if (pushBody.title === '') {
      listErrors.title = true;
    } else if (pushBody.body === '') {
      listErrors.body = true;
    }

    if (pushBody.typeNotification === 'DIRECT') {
      if (pushBody.listDirectPush.length === 0) {
        listErrors.listDirectPush = true;
      }
    } else if (pushBody.typeNotification === 'PRIVATE') {
      if (pushBody.sendTo === 'EMAIL' && pushBody.email === '') {
        listErrors.email = true;
      }

      if (pushBody.sendTo === 'MERCHANT' && pushBody.merchant === '') {
        listErrors.merchant = true;
      }

      if (pushBody.sendTo === 'MERCHANTS' && pushBody.merchants.length === 0) {
        listErrors.merchants = true;
      }
    }

    if (!(listErrors.title || listErrors.body || listErrors.listDirectPush || listErrors.email || listErrors.merchant || listErrors.merchants)) {
      sendPushMessage();
    } else {
      let message = listErrors.title ? 'Debe ingresar un titulo' :
        listErrors.body ? 'Debe ingresar el cuerpo del mensaje' :
          listErrors.listDirectPush ? 'Debe cargar una lista de IDPush' :
            listErrors.email ? 'Debe ingresar el email al cual se debe enviar la notificación' :
              listErrors.merchant ? 'Debe ingresar el merchant al cual se debe enviar la notificación' : 'Debe cargar una lista de merchant a los cuales se debe enviar la notificación'
      setConfirmUser({
        show: true,
        title: 'Error',
        message,
        onAccept: () => setConfirmUser({ show: false })
      });
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

      {infoSearchPanel.showPanel &&
        <SearchPanel
          listMerchant={listMerchant}
          listPreSelected={(pushBody.merchants && pushBody.merchants.length > 0) ? pushBody.merchants : []}
          onClose={() => setInfoSearchPanel({ showPanel: false, selectMultiple: false })}
          selectMultiple={infoSearchPanel.selectMultiple}
          onSelectMerchant={(merchant) => {
            let data = { ...pushBody };
            data.merchant = merchant;
            setPushBody(data);
            setInfoSearchPanel({ showPanel: false, selectMultiple: false });
          }}
          onMultipleSelect={(listMerchants) => {
            let data = { ...pushBody };
            data.merchants = listMerchants;
            setPushBody(data);
            setInfoSearchPanel({ showPanel: false, selectMultiple: false });
          }}
        />
      }

      {uploadPanel &&
        <UploadPanel
          onClose={() => setUploadPanel(false)}
          onConfirmSelect={(pushList) => {
            let data = { ...pushBody };
            data.listDirectPush = pushList;
            setPushBody(data);
            setUploadPanel(false);
          }}
        />
      }

      <div className='row align-items-center flex-column mx-4'>
        <div className='col-md-5 col-sm-12'>
          <FieldForm
            label='Tipo Notificación'
            type='select'
            customStyle='mt-3'
            value={pushBody.typeNotification}
            onChangeValue={(type) => {
              let data = { ...pushBody };
              data.typeNotification = type;
              setPushBody(data);
            }}
            listElements={[
              { value: 'PUBLIC', label: 'Publica' },
              { value: 'PRIVATE', label: 'Privada' },
              { value: 'DIRECT', label: 'Direct Push' }
            ]}
          />
        </div>

        {pushBody.typeNotification === 'PRIVATE' &&
          <div className='col-md-5 col-sm-12'>
            <FieldForm
              label='Enviar a'
              type='select'
              customStyle='mt-3'
              value={pushBody.sendTo}
              onChangeValue={(type) => {
                let data = { ...pushBody };
                data.sendTo = type;
                setPushBody(data);
              }}
              listElements={[
                { value: 'MERCHANT', label: 'Comercio' },
                { value: 'MERCHANTS', label: 'Lista de Comercios' },
                { value: 'EMAIL', label: 'Email' }
              ]}
            />
          </div>
        }

        {pushBody.typeNotification === 'PRIVATE' && (pushBody.sendTo === 'MERCHANT' || pushBody.sendTo === 'MERCHANTS') &&
          <div className='col-md-5 col-sm-12 mt-3 d-flex flex-column align-items-start'>
            <label className='mb-0 mr-2 font-bold text-left'>
              Seleccionar Comercio
            </label>
            <div className='field-container w-100 d-flex text-left align-items-center justify-content-between'>
              <div>
                {pushBody.sendTo === 'MERCHANT' && (pushBody.merchant !== '' ? pushBody.merchant : 'No se ha seleccionado un comercio')}
                {pushBody.sendTo === 'MERCHANTS' && `${pushBody.merchants.length} comercios seleccionados`}
              </div>
              <button
                className='search-commerce'
                onClick={() => setInfoSearchPanel({ showPanel: true, selectMultiple: (pushBody.sendTo === 'MERCHANTS') })}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        }

        {pushBody.typeNotification === 'PRIVATE' && pushBody.sendTo === 'EMAIL' &&
          <div className='col-md-5 col-sm-12'>
            <FieldForm
              label='Email'
              customStyle='my-3'
              value={pushBody.email}
              onChangeValue={(value) => {
                let data = { ...pushBody };
                data.email = value;
                setPushBody(data);
              }}
            />
          </div>
        }

        {pushBody.typeNotification === 'DIRECT' &&
          <div className='col-md-5 col-sm-12 mt-3 d-flex flex-column align-items-start'>
            <label className='mb-0 mr-2 font-bold text-left'>
              Cargar IdPush
              </label>
            <div className='field-container w-100 d-flex text-left align-items-center justify-content-between'>
              <div>
                {`${pushBody.listDirectPush.length} IdPush Cargados`}
              </div>
              <button
                className='search-commerce'
                onClick={() => setUploadPanel(true)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        }

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Titulo notificación'
            customStyle='mt-3'
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
          <FieldForm
            label='Link'
            customStyle='mt-3'
            value={pushBody.url}
            onChangeValue={(message) => {
              let data = { ...pushBody };
              data.url = message;
              setPushBody(data);
            }}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Link Imagen'
            customStyle='mt-3'
            value={pushBody.urlImage}
            onChangeValue={(link) => {
              let data = { ...pushBody };
              data.urlImage = link;
              setPushBody(data);
            }}
          />
        </div>

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
      </div>
    </React.Fragment>
  )
}

export default SendPush;
