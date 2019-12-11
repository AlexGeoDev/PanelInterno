import React, { useState } from "react";
import { Table } from "../../components/table/Table";
import { Link, useCurrentRoute } from "react-navi";
import { Modal } from "../../components/modal/Modal";
import {
  sendCredentials,
  trackEvent,
  syncUsers,
  sendData
} from "../../business/transactionBusiness";
import { TableComponent } from "../../components/table/TableComponent";

function Registros(props) {
  let { data } = useCurrentRoute();
  const [selected, setSelected] = useState();
  const [action, setAction] = useState();
  console.log("Clientes", props, data);

  let handleSelect = (selected, e) => {
    console.log(selected, e);
    if (selected) {
      setSelected(e);
    } else {
      setSelected(null);
    }
  };

  return (
    <React.Fragment>
      {action && <div>{action}</div>}
      <div>
        <span>Lista de registros</span>
        <span></span>
      </div>
      <div className="row">
        <div className="col-md-9">
          <TableComponent
            styleCols="minmax(150px, 1fr)
                  minmax(150px, 1fr)
                  minmax(150px, 1fr)
                  minmax(150px, 1fr)
                  "
            data={data.data}
            cols={[
              { label: "Nombre", value: "name" },
              { label: "Correo electrónico", value: "email" },
              { label: "Referencia de pago", value: "paymentRef" },
              { label: "Estado", value: "formStatus" }
            ]}
            onSelect={handleSelect}
          />
        </div>
        <div className="col-md-3">
          <div>
            {selected && (
              <div className="detail">
                <div>
                  {selected.name}
                </div>
                <div>{selected.email}</div>
                <div></div>
                <div>
                  <div>Acciones</div>
                  <div>
                    <div>

                    </div>
                    <div>
                      <button
                        onClick={() => {
                          sendData(selected.email);
                        }}
                      >
                        Enviar informacion al correo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>

      <style jsx>
        {`
          .detail {
            text-align: left;
            margin-bottom: 2rem;
          }

          .acciones {
            text-align: left;
          }
        `}
      </style>
    </React.Fragment>
  );
}

export { Registros };
