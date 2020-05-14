import React, { useState } from "react";
import { fetchDataInfo, fetchInfoRegister } from "../../business/PagofacilBusiness";
import { FieldForm } from "../../components/fieldForm/FieldForm";
import { TableComponent } from "../../components/table/TableComponent";

function fetchData(email, serial) {
  const promise = new Promise((resolve, reject) => {
    let response = fetchDataInfo(email, serial)
    response.then((data) => {
      if (data && data.body) {
        let resultData = data.body;
        let responseRegister = fetchInfoRegister(resultData.merchantCode)
        responseRegister.then((infoRegister) => {
          if (infoRegister && infoRegister.body) {
            resultData.listInfo = infoRegister.body;
            resolve(resultData);
          } else {
            resolve();
          }
        })
      } else {
        alert('Para los filtros ingresados no se encontraron datos')
        resolve();
      }
    })
  })
  return promise;
}

function VerifyInfo(props) {
  const [info, setInfo] = useState({});
  const [email, setEmail] = useState();
  const [serial, setSerial] = useState();

  return (
    <React.Fragment>
      <div className='row justify-content-center'>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Correo'
            value={email}
            onChangeValue={setEmail}
          />
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <FieldForm
            label='Serial'
            value={serial}
            onChangeValue={setSerial}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mt-4'>
          <button
            onClick={async () => {
              let data = await fetchData(email, serial);
              if (data) {
                setInfo(data);
              }
            }}
          >
            Filtrar
          </button>
        </div>
      </div>

      {info.merchantCode &&
        <>
          <div className='row flex-column align-items-center mt-4'>
            <div className='col-6'>
              <FieldForm
                label='Merchant Code'
                readOnly={true}
                horizontal={true}
                customStyle='my-3'
                value={info.merchantCode}
              />

              <FieldForm
                label='Operator Code'
                readOnly={true}
                horizontal={true}
                customStyle='my-3'
                value={info.operatorCode}
              />

              <FieldForm
                label='Categoria'
                readOnly={true}
                horizontal={true}
                customStyle='my-3'
                value={info.categoria}
              />

              <FieldForm
                label='Nombre'
                readOnly={true}
                horizontal={true}
                customStyle='my-3'
                value={info.nombre}
              />
            </div>
          </div>

          <div className='row align-items-start mt-4'>
            <div className='col-6'>
              <p className='px-0 modal-subtitle'>
                Dispositivos
              </p>
              {info.listInfo &&
                info.listInfo.map(device => {
                  if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(device.dispositivo))) {
                    return (
                      <div>
                        {device.dispositivo}
                      </div>
                    )
                  }

                })
              }
            </div>

            <div className='col-6'>
              <p className='px-0 modal-subtitle'>
                Correos
              </p>
              {info.listInfo &&
                info.listInfo.map(device => {
                  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(device.dispositivo)) {
                    return (
                      <div>
                        {device.dispositivo}
                      </div>
                    )
                  }

                })
              }
            </div>
          </div>
        </>
      }
    </React.Fragment>
  )
}

export { VerifyInfo };