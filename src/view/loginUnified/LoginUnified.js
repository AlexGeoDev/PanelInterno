import React, { useState } from "react";
import { createUserApp, fetchCredentials, fetchDataByEmail, updateCyclosPass, updateUserApp, validateCyclos, validateRegisterUser, validateSp } from "../../business/LoginUnifiedBusiness";
import { FieldForm } from "../../components/fieldForm/FieldForm";
import { Loading } from "../../components/loading/Loading";
import { ModalConfirm } from "../../components/modalConfirm/ModalConfirm";
import TabComponent from "../../components/tabsComponent";

function LoginUnified(props) {
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = React.useState(1);
  const [listElement] = React.useState([
    {
      label: 'Validar Registro',
      active: 1,
      onAction: () => setCurrentView(1)
    },
    {
      label: 'Validar Credenciales',
      active: 2,
      onAction: () => setCurrentView(2)
    }
  ]);

  const [infoCredentials, setInfoCredentials] = React.useState(
    {
      spCredentials: false,
      spError: null,
      cyclosCredentials: false,
      cyclosError: null,
      showData: false,
      isAdmin: false
    }
  );

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

  const [merchantRestore, setMerchantRestore] = useState();

  const [infoUpdate, setInfoUpdate] = useState({
    showUpdate: false,
    isEmail: false,
    email: '',
    merchant: '',
    operator: '',
    pin: '1234',
    rol: '',
    pass: '',
    admin: false
  });

  let validateCredentials = () => {
    let email = infoValidation.email.trim().toLowerCase();
    setLoading(true);
    let response = fetchCredentials(email);
    response.then((value) => {
      value.json().then(data => {
        let infoUsr = data.body;

        // almacena el merchant
        setMerchantRestore(infoUsr.merchantCode);

        let validateCyclosProm = new Promise((resolve, reject) => {
          if (infoUsr.rol && infoUsr.rol === 'admin') {
            let responseCyclos = validateCyclos(infoUsr.merchantCode);
            responseCyclos.then((cyclosVal) => {
              cyclosVal.json().then(dataCyclos => {
                let intoTemp = {
                  cyclosCredentials: false,
                  cyclosError: null,
                };
                if (dataCyclos.header.codigoError === null) {
                  intoTemp.cyclosCredentials = dataCyclos.body === 'active';
                } else {
                  intoTemp.spError = dataCyclos.header.codigoError;
                }
                resolve(intoTemp);
              })
            }).catch((err) => {
              console.log(err);
            });
          } else {
            resolve();
          }
        });

        let validateSPProm = new Promise((resolve, reject) => {
          let responseSp = validateSp(infoUsr);
          responseSp.then((spVal) => {
            spVal.json().then(dataSp => {
              let intoTemp = {
                spCredentials: false,
                spError: null
              };
              if (dataSp.header.codigoError === null) {
                intoTemp.spCredentials = dataSp.body === 'SUCCESS';
              } else {
                intoTemp.spError = dataSp.header.codigoError;
              }
              resolve(intoTemp);
            })
          }).catch((err) => {
            console.log(err);
          });
        });

        Promise.all([validateCyclosProm, validateSPProm]).then(
          (values) => {
            setLoading(false);

            console.log('RESULTADOS', values);
            let intoTemp = { ...infoCredentials };
            intoTemp.showData = true;
            intoTemp.isAdmin = infoUsr.rol && infoUsr.rol === 'admin';

            if (intoTemp.isAdmin) {
              intoTemp.cyclosCredentials = values[0].cyclosCredentials;
              intoTemp.cyclosError = values[0].cyclosError;
            }

            intoTemp.spCredentials = values[1].spCredentials;
            intoTemp.spError = values[1].spError;
            setInfoCredentials(intoTemp);
          }
        );
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  let updateCredentials = () => {
    let response = updateCyclosPass(merchantRestore);
    setLoading(true);
    response.then((value) => {
      value.json().then(data => {
        setLoading(false);
        let error = data.header.codigoError;
        if (error) {
          let mensajeModal = null;

          if (error === 'NO_MERCHANTCODE_TO_VALIDATE') {
            mensajeModal = 'No se ha enviado el merchant para realizar la restauracion';
          } else if (error === 'SEARCH_CLIENT_FAIL') {
            mensajeModal = 'Se ha presentado un error al buscar el cliente asociado al merchant';
          } else if (error === 'CLIENT_NOT_REGISTER') {
            mensajeModal = 'No se ha encontrado un cliente asociado al merchant';
          } else if (error === 'CYCLOS_CRED_BD_ERROR') {
            mensajeModal = 'No se ha podido actualizar la informacion de las credenciales en base de datos';
          } else if (error === 'CYCLOS_CRED_SERVER_ERROR') {
            mensajeModal = 'No se ha podido actualizar la informacion de las credenciales en cyclos';
          } else if (error === 'CHANGE_PASS_EXCEPTION') {
            mensajeModal = 'Se ha generado una excepcion al realizar la restauracion de las credenciales';
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
        } else {
          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Exito';
          infoModal.message = 'Se han resuaturado las credenciales de Cyclos Exitosamente.';
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
            validateCredentials();
          }
          setConfirmInfo(infoModal);
        }
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  let validateExists = () => {
    let email = infoValidation.email.trim().toLowerCase();
    let response = validateRegisterUser(email, infoValidation.merchant);
    setLoading(true);
    response.then((value) => {
      value.json().then(data => {
        let error = data.header.codigoError;
        if (error && (error === 'CREDENTIALS_NOT_FOUND' || error === 'NO_KEYCLOAK_USER_CREATED')) {
          let infoTemp = { ...infoUpdate };
          infoTemp.showUpdate = true;

          if (infoValidation.merchant != null && infoValidation.merchant != '') {
            infoTemp.merchant = infoValidation.merchant;
            setInfoUpdate(infoTemp);
          }

          if (infoValidation.email != null && infoValidation.email != '') {
            infoTemp.email = email;
            infoTemp.isEmail = true;
            fetchDataEmail(infoTemp);
          } else {
            setLoading(false);
          }
        } else if (error && error !== 'CREDENTIALS_NOT_FOUND') {
          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Error';
          infoModal.message = 'Se ha presentado un error validando la informacion del usuario';
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);
          setLoading(false);
        } else {
          let reset = {
            showUpdate: false,
            isEmail: false,
            email: '',
            merchant: '',
            operator: '',
            pin: '1234',
            rol: '',
            pass: ''
          }
          setInfoUpdate(reset);

          let usuario = infoValidation.email ? infoValidation.email : infoValidation.merchant;
          let merchant = data.body.merchant;
          let operator = data.body.operator;

          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Usuario Registrado';
          infoModal.message = 'El usuario ' + usuario + ' ya se encuentra registrado al MerchantCode ' + merchant + ' y OperadorCode: ' + operator;
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);
          setLoading(false);
        }
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  let fetchDataEmail = (infoTemp) => {
    let info = infoTemp;
    let email = infoTemp.email.trim().toLowerCase();

    let response = fetchDataByEmail(email);
    response.then((value) => {
      value.json().then(data => {
        setLoading(false);
        if (data.body == null) {
          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'El usuario no esta registrado';
          infoModal.message = 'El correo ' + info.email + ' no esta registrado, debe ser registrado a continuación';

          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);


          let infoTemp = { ...infoUpdate };
          infoTemp.email = email;
          infoTemp.showUpdate = true;
          setInfoUpdate(infoTemp);
        } else {

          let infoModal = { ...confirmInfo };
          infoModal.showModal = true;
          infoModal.title = 'Registro';
          infoModal.message = 'A continuación se carga la información encontrada en base de datos, por favor complete el registro.';
          infoModal.onAccept = () => {
            let infoCerrar = { ...confirmInfo };
            infoCerrar.showModal = false;
            setConfirmInfo(infoCerrar);
          }
          setConfirmInfo(infoModal);

          infoTemp.merchant = data.body.merchantCode;
          infoTemp.operator = data.body.operatorCode;
          setInfoUpdate(infoTemp);
        }
      })
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }

  let createUser = () => {
    let email = infoUpdate.email.trim().toLowerCase();
    setLoading(true);
    let response = createUserApp(email, infoUpdate.merchant, infoUpdate.operator, '1234', infoUpdate.operator === '100' ? 'admin' : 'operador', '1234', infoUpdate.admin);
    response.then((value) => {
      value.json().then(data => {
        setLoading(false);
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
            message = 'Fallo al buscar la lista de operadores del merchantCode';
          } else if (error === 'REGISTER_TO_ANOTHER_COMMERCE') {
            message = 'El correo esta registrado en otro comercio';
          } else if (error === 'CLIENT_NOT_REGISTER') {
            message = 'Se ha presentado un error el registrar el nuero merchantCode';
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

  let updateUser = () => {
    let email = infoUpdate.email.trim().toLowerCase();
    setLoading(true);
    let response = updateUserApp(email, infoUpdate.merchant, infoUpdate.operator, '1234', infoUpdate.operator === '100' ? 'admin' : 'operador', '1234', infoUpdate.admin);
    response.then((value) => {
      value.json().then(data => {
        setLoading(false);

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
            message = 'Fallo al buscar la lista de operadores del merchantCode';
          } else if (error === 'REGISTER_TO_ANOTHER_COMMERCE') {
            message = 'El correo esta registrado en otro comercio';
          } else if (error === 'CLIENT_NOT_REGISTER') {
            let infoModal = { ...confirmInfo };
            infoModal.showModal = true;
            infoModal.title = 'Registro';
            infoModal.message = 'El merchantCode ingresado no esta creado en el sistema\n¿Desea crearlo?';
            infoModal.onAccept = () => {
              let infoCerrar = { ...confirmInfo };
              infoCerrar.showModal = false;
              setConfirmInfo(infoCerrar);

              // Creacion del merchantCode
              createUser();
            }

            infoModal.onCancel = () => {
              window.location.reload();
            }
            setConfirmInfo(infoModal);
            return;
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

      <TabComponent active={currentView} listElement={listElement} />

      {currentView === 1 &&
        <div className='mt-4'>
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

            <div className='col-5 d-none'>
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

              <div className='col-5 my-2'>
                <div className='d-flex align-items-center justify-content-center'>
                  <label className='mb-0 mr-2 font-bold'>
                    Es administrador?
                </label>
                  <input
                    type="checkbox"
                    checked={infoUpdate.admin}
                    onChange={element => {
                      let infoAux = { ...infoUpdate };
                      infoAux.admin = element.target.checked;
                      setInfoUpdate(infoAux);
                    }}
                  />
                </div>
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
      }

      {currentView === 2 &&
        <div className='mt-4'>
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
          </div>

          <button
            onClick={() => {
              validateCredentials();
            }}
          >
            Validar
          </button>

          {infoCredentials.showData &&
            <div
              className='w-50 d-flex flex-column mx-auto align-items-center my-3'
            >
              <div
                className='d-flex mb-3'
              >
                <FieldForm
                  label='Administrador:'
                  readOnly={true}
                />
                <span>
                  {infoCredentials.isAdmin ? 'SI' : 'NO'}
                </span>
              </div>

              {infoCredentials.isAdmin &&
                <div
                  className='d-flex align-items-center mb-3'
                >
                  <FieldForm
                    label='Status Cyclos'
                    readOnly={true}
                  />
                  <span
                    className={`font-status ${infoCredentials.cyclosCredentials ? 'active' : 'error'}`}
                  >
                    {infoCredentials.cyclosCredentials ? 'Correcto' : 'Fallando'}
                  </span>

                  {!infoCredentials.cyclosCredentials &&
                    <button
                      className='ml-3'
                      onClick={() => {
                        updateCredentials();
                      }}
                    >
                      Restaurar Credenciales
                    </button>
                  }
                </div>
              }

              <div
                className='d-flex'
              >
                <FieldForm
                  label='Status Smartpesa'
                  readOnly={true}
                />
                <span
                  className={`font-status ${infoCredentials.spCredentials ? 'active' : 'error'}`}
                >
                  {infoCredentials.spCredentials ? 'Correcto' : 'Fallando'}
                </span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export { LoginUnified };
