import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ModalConfirm } from "../components/modalConfirm/ModalConfirm";
import { FieldForm } from "../components/fieldForm/FieldForm";
import { fetchTokenRecover } from "../business/PagofacilBusiness";

function UtilidadesCajero(props) {
  const [codMaestro, setCodMaestro] = useState(0);
  const [emailRecover, setEmailRecover] = useState();
  const [linkRecover, setLinkRecover] = useState({
    link: null,
    showLink: false
  });
  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: '',
    message: '',
    onAccept: null
  });
  const [currentDate] = useState(new Date());

  useEffect(() => {
    let codigoVigente = (((currentDate.getMonth() + 1) * 2) + currentDate.getDate()) * currentDate.getFullYear();
    setCodMaestro(codigoVigente);
  }, [])

  let setFormat = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }

  let generarLink = () => {
    let valRegister = fetchTokenRecover(emailRecover);
    valRegister.then((infoToken) => {
      if (infoToken.extraData == null) {
        let datatemp = { ...linkRecover }
        datatemp.link = `https://cajero.co/password/recuperar?token=${infoToken.data}`;
        datatemp.showLink = true;
        setLinkRecover(datatemp);
      } else {
        let message;
        if (infoToken.extraData === 'USER-NOT-EXIST') {
          message = 'El usuario ingresado no existe';
        } else {
          message = infoToken.extraData;
        }

        let infoModal = { ...confirmInfo };
        infoModal.showModal = true;
        infoModal.title = 'Error';
        infoModal.message = message;
        infoModal.onAccept = () => {
          let infoCerrar = { ...confirmInfo };
          infoCerrar.showModal = false;
          setConfirmInfo(infoCerrar);
        }
        setConfirmInfo(infoModal);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      {confirmInfo.showModal &&
        <ModalConfirm
          title={confirmInfo.title}
          message={confirmInfo.message}
          onAccept={confirmInfo.onAccept}
        />
      }
      <div
        className='d-flex flex-column'
      >
        <fieldset>
          <legend>
            Codigo Maestro SMS
        </legend>
          <div
            className='d-flex justify-content-center align-items-center'
          >
            <div
              className='d-flex flex-column mx-3'
            >
              <span>
                Codigo Maestro Hoy
              </span>

              <span>
                {setFormat(currentDate)}
              </span>
            </div>

            <span
              className='cod-text'
            >
              {codMaestro}
            </span>

            <button
              className='copy-cod mx-3 d-none'
              title='Copiar Codigo'
              onClick={() => {
                window.navigator.clipboard.writeText(codMaestro);

                let infoModal = { ...confirmInfo };
                infoModal.showModal = true;
                infoModal.title = 'Informacion';
                infoModal.message = 'Codigo copiado al portapapeles';
                infoModal.onAccept = () => {
                  let infoCerrar = { ...confirmInfo };
                  infoCerrar.showModal = false;
                  setConfirmInfo(infoCerrar);
                }
                setConfirmInfo(infoModal);
              }}
            >
              <FontAwesomeIcon
                className='option-icon'
                icon={faCopy}
              />
            </button>
          </div>
        </fieldset>

        <fieldset
          className='mt-5'
        >
          <legend>
            Generar Link Recuperacion
          </legend>
          <div
            className='d-flex flex-column justify-content-center align-items-center'
          >
            <div className='row justify-content-center'>
              <div className='col-12'>
                <FieldForm
                  label='Correo Electronico'
                  value={emailRecover}
                  horizontal={true}
                  onChangeValue={setEmailRecover}
                />
              </div>
            </div>
          </div>

          <button
            className='mt-3'
            onClick={() => {
              generarLink()
            }}
          >
            Generar
          </button>

          {linkRecover.showLink &&
            <div
              className='d-flex justify-content-center mt-2'
            >
              <span
                className='cod-text'
              >
                {linkRecover.link}
              </span>

              <button
                className='copy-cod mx-3 d-none'
                title='Copiar Link'
                onClick={() => {
                  window.navigator.clipboard.writeText(linkRecover.link);

                  let infoModal = { ...confirmInfo };
                  infoModal.showModal = true;
                  infoModal.title = 'Informacion';
                  infoModal.message = 'Codigo copiado al portapapeles';
                  infoModal.onAccept = () => {
                    let infoCerrar = { ...confirmInfo };
                    infoCerrar.showModal = false;
                    setConfirmInfo(infoCerrar);
                  }
                  setConfirmInfo(infoModal);
                }}
              >
                <FontAwesomeIcon
                  className='option-icon'
                  icon={faCopy}
                />
              </button>
            </div>
          }
        </fieldset>
      </div>
    </div>
  )
}

export { UtilidadesCajero }