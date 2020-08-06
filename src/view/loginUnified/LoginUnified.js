import React, { useState } from "react";
import { FieldForm } from "../../components/fieldForm/FieldForm";
import { validateRegisterUser, fetchDataByEmail, updateUserApp } from "../../business/LoginUnifiedBusiness";
import { ModalConfirm } from "../../components/modalConfirm/ModalConfirm";

function LoginUnified(props) {
  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: '',
    message: '',
    onAccept: null
  });

  const [infoValidation, setInfoValidation] = useState({
    email: '',
    merchant: ''
  });

  const [infoUpdate, setInfoUpdate] = useState({
    showUpdate: false,
    isEmail: false,
    email: '',
    merchant: '',
    operator: '',
    pin: '1234',
    rol: '',
    pass: ''
  });

  let validateExists = () => {
    let response = validateRegisterUser(infoValidation.email, infoValidation.merchant);
    response.then((value) => {
      value.json().then(data => {
        if (!data.body) {
          let infoTemp = { ...infoUpdate };
          infoTemp.showUpdate = true;

          if (infoValidation.merchant != null && infoValidation.merchant != '') {
            infoTemp.merchant = infoValidation.merchant;
            setInfoUpdate(infoTemp);
          }

          if (infoValidation.email != null && infoValidation.email != '') {
            infoTemp.email = infoValidation.email;
            infoTemp.isEmail = true;
            fetchDataEmail(infoTemp);
          }

        } else {
          let usuario = infoValidation.email ? infoValidation.email : infoValidation.merchant;

          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Usuario Registrado';
          infoModal.message = 'El usuario ' + usuario + ' ya se encuentra registrado con el nuevo login';
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);
        }
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  let fetchDataEmail = (infoTemp) => {
    let response = fetchDataByEmail(infoTemp.email);
    response.then((value) => {
      value.json().then(data => {
        infoTemp.merchant = data.body.merchantCode;
        infoTemp.operator = data.body.operatorCode;
        setInfoUpdate(infoTemp);
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  let updateUser = () => {
    let response = updateUserApp(infoUpdate.email, infoUpdate.merchant, infoUpdate.operator, '1234', infoUpdate.operator === '100' ? 'admin' : 'operador', '1234');
    response.then((value) => {
      value.json().then(data => {
        let title = null;
        let message = null;
        if (data.body) {
          title = 'Usuario Registrado';
          message = 'El usuario ' + infoUpdate.email + ' se ha registrado exitosamente';
        } else {
          title = 'Error en el registro';

          let error = data.header.codigoError;
          if (error === 'FAIL_SEARCH_CLIENT') {
            message = 'No se pudo encontrar el cliente con el merchant ingresado';
          } else if (error === 'FAIL_SEARCH_OPERATOR') {
            message = 'No se pudo encontrar el operador con el operador ingresado';
          } else if (error === 'FAIL_SEARCH_USER') {
            message = 'No se pudo encontrar el usuario con el correo ingresado';
          } else if (error === 'FAIL_SEARCH_USER_OP') {
            message = 'No se pudo encontrar el usuario con el correo ingresado';
          } else if (error === 'FAIL_SEARCH_USEROP_LIST') {
            message = 'El merchantCode no esta registrado';
          } else if (error === 'REGISTER_TO_ANOTHER_COMMERCE') {
            message = 'El correo esta registrado en otro comercio';
          } else if (error === 'CLIENT_NOT_REGISTER') {
            message = 'El merchantCode no esta registrado';
          } else if (error === 'USER_NOT_REGISTER') {
            message = 'El correo no esta registrado';
          } else if (error === 'CYCLOS_CRED_NOT_REGISTER') {
            message = 'Se ha generado un error al registrar las credenciales de cyclos en la plataforma';
          } else if (error === 'USER_OPERATOR_NOT_REGISTER') {
            message = 'Se ha generado un error al registrar el correo asociado al operador';
          } else if (error === 'PIN_USER_OPERATOR_NOT_REGISTER') {
            message = 'Se ha generado un error al registrar el PIN del usuario';
          } else if (error === 'KEYCLOAK_CREATE_USER_ERROR') {
            message = 'Se ha generado un error al crear el usuario en la plataforma';
          } else if (error === 'CYCLOS_UPDATE_PASSWORD_FAIL') {
            message = 'Se ha generado un error al actualizar las credenciales en cyclos';
          } else if (error === 'REGISTER_BACK_EXCEPTION') {
            message = 'Se ha generado un error al realizar el registro en la aplicacion';
          } else if (error === 'EMAIL_REQUIRED') {
            message = 'El correo es requerido';
          } else if (error === 'MERCHANT_REQUIRED') {
            message = 'El merchantCode es requerido';
          } else if (error === 'OPERATOR_REQUIRED') {
            message = 'El operatorCode es requerido';
          } else if (error === 'PIN_REQUIRED') {
            message = 'El PIN es requerido';
          } else if (error === 'ROL_REQUIRED') {
            message = 'El rol es requerido';
          } else if (error === 'PASS_REQUIRED') {
            message = 'El password es requerido';
          } else if (error === 'EMAIL_ALREADY_REGISTER') {
            message = 'El correo ingresado ya se encuentra registrado en la plataforma';
          } else if (error === 'EMAIL_REGISTER_ANOTHER_COMMERCE') {
            message = 'El correo esta registrado en otro comercio';
          } else if (error === 'EMAIL_NO_ASSOCIATE_COMMERCE') {
            message = 'El correo ingresado no esta asociado al merchant';
          } else if (error === 'OPERATOR_NOT_REGISTER') {
            message = 'No se encuentra el operador asociado al merchant ingresado';
          } else if (error === 'EMAIL_REGISTER_MULTIPLE_USERS') {
            message = 'El correo ingreado esta registrado en multiples merchant';
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
            value={infoValidation.email}
            onChangeValue={(value) => {
              let infoAux = { ...infoValidation };
              infoAux.email = value;
              setInfoValidation(infoAux);
            }}
          />
        </div>

        <div className='col-5'>
          <FieldForm
            label='MerchantCode'
            value={infoValidation.merchant}
            onChangeValue={(value) => {
              let infoAux = { ...infoValidation };
              infoAux.merchant = value;
              setInfoValidation(infoAux);
            }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          validateExists();
        }}
      >
        Validar
      </button>

      {infoUpdate.showUpdate &&
        <div className='row flex-column align-content-center mb-3'>
          <div className='col-5 my-2'>
            <FieldForm
              label='Email'
              readOnlyField={infoUpdate.isEmail}
              value={infoUpdate.email}
              onChangeValue={(value) => {
                let infoAux = { ...infoUpdate };
                infoAux.email = value;
                setInfoUpdate(infoAux);
              }}
            />
          </div>

          <div className='col-5 my-2'>
            <FieldForm
              label='MerchantCode'
              value={infoUpdate.merchant}
              readOnlyField={true}
              onChangeValue={(value) => {
                let infoAux = { ...infoUpdate };
                infoAux.merchant = value;
                setInfoUpdate(infoAux);
              }}
            />
          </div>

          <div className='col-5 my-2'>
            <FieldForm
              label='OperatorCode'
              value={infoUpdate.operator}
              readOnlyField={infoUpdate.isEmail}
              onChangeValue={(value) => {
                let infoAux = { ...infoUpdate };
                infoAux.operator = value;
                setInfoUpdate(infoAux);
              }}
            />
          </div>

          <button
            className='col-3 mt-3 mx-auto'
            onClick={() => {
              updateUser();
            }}
          >
            Registrar Nuevo Login
          </button>
        </div>
      }
    </div>
  )
}

export { LoginUnified };