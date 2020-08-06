import React, { useState } from "react";
import { FieldForm } from "../../components/fieldForm/FieldForm";
import { ModalConfirm } from "../../components/modalConfirm/ModalConfirm";
import { registerAdmonService } from "../../business/LoginUnifiedBusiness";

function RegisterAdmin(props) {
  const [infoAdmin, setInfoAdmin] = useState({
    email: ''
  });

  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: '',
    message: '',
    onAccept: null
  });

  let registerAdmon = () => {
    let response = registerAdmonService(infoAdmin.email);
    response.then((value) => {
      value.json().then(data => {
        let title = null;
        let message = null;
        if (data.body && data.body === true) {
          title = 'Usuario ha sigo asignado como Administrador';
          message = 'El usuario ' + infoAdmin.email + ' se ha registrado exitosamente como administrador';
        } else {
          title = 'Error en el registro';

          let error = data.header.codigoError;
          if (error === 'NO_DATA_TO_PROCESS_UPDATE') {
            message = 'No se ha ingresado la informacion minima pare realizar el proceso';
          } else if (error === 'MERCHANT_SEARCH_FAILED') {
            message = 'No se ha podido encontrar un MerchantCode asociado al correo';
          } else if (error === 'FAIL_SEARCH_CLIENT') {
            message = 'Se ha presentado un error al buscar el Cliente asociado al MerchantCode';
          } else if (error === 'CLIENT_NOT_REGISTER') {
            message = 'No se ha encontrado un cliente asociado al MerchantCode';
          } else if (error === 'FAIL_SEARCH_USER') {
            message = 'Se ha presentado un error al encontrar un usuario asociado al correo';
          } else if (error === 'USER_NOT_REGISTER') {
            message = 'No se ha podido encontrar un usuario asociado al correo';
          } else if (error === 'UPDATE_ADMIN_REGISTER_EXCEPTION') {
            message = 'Se ha presentado un error al procesar su solicitud';
          }
        }

        let infoModal = { ...confirmInfo };
        infoModal.showModal = true;
        infoModal.title = title;
        infoModal.message = message;
        infoModal.onAccept = () => {
          let infoCerrar = { ...confirmInfo };
          infoCerrar.showModal = false;
          setConfirmInfo(infoCerrar);
        }
        setConfirmInfo(infoModal);
      })
    }).catch((err) => {
      console.log(err);
    });
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

      <div className='row justify-content-center mb-3'>
        <div className='col-5'>
          <FieldForm
            label='Email'
            value={infoAdmin.email}
            onChangeValue={(value) => {
              let infoAux = { ...infoAdmin };
              infoAux.email = value;
              setInfoAdmin(infoAux);
            }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          registerAdmon();
        }}
      >
        Registrar como Administrador
      </button>
    </div>
  )
}

export { RegisterAdmin };
