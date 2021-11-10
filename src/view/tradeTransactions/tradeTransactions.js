import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  fetchDetailLVO,
  fetchInfoDetailTx,
  fetchPaymentTry,
  fetchTradeTransactions,
} from "../../business/PagofacilBusiness";
import GenericModal from "../../components/modalConfirm/GenericModal";
import { ModalConfirm } from "../../components/modalConfirm/ModalConfirm";

function TradeTransactions(props) {
  const [email, setEmail] = useState();
  const [merchant, setMerchant] = useState();
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [info, setInfo] = useState();
  const [openModal, setOpenModal] = useState(false);

  const formatDate = (date) => {
    return date ? moment(date).format("yyyy-MM-DD") : "";
  };

  const tradeTransactions = async () => {
    const fetchInfo = await fetchTradeTransactions(
      email,
      merchant,
      fechaInicio,
      fechaFinal
    );
    setInfo(fetchInfo.body);
  };

  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: "",
    message: "",
    onAccept: null,
  });

  const fetchTxDetail = async (infoTx) => {
    if (
      infoTx.tipoMovimiento === "CYCLOS" &&
      !infoTx.description.includes("LVO")
    ) {
    } else if (infoTx.description.includes("LVO")) {
      let detailTransaction = await fetchDetailLVO(infoTx.description);
      debugger;
    } else {
      let detailTransaction = await fetchInfoDetailTx(infoTx.id);
      debugger;
      if (infoTx.description.startsWith("PGL")) {
        let paymentTry = await fetchPaymentTry(infoTx.id);
        debugger;
      }
    }
  };

  return (
    <React.Fragment>
      {openModal && (
        <GenericModal>
          <button onClick={() => setOpenModal(true)}>Cerrar</button>
        </GenericModal>
      )}
      <div>
        <h3>Transacciones de comercio</h3>
      </div>

      <div className="row justify-content-center mt-5">
        <form>
          <label for="email" className=" col-md-6">
            <span>email</span>
            <input
              className="form-control"
              type="text"
              id="email"
              placeholder="usuario@correo.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>

          <label for="merchant" className=" col-md-6">
            <span>merchant</span>
            <input
              className="form-control"
              type="text"
              id="merchant"
              placeholder="merchant"
              value={merchant}
              onChange={(event) => {
                setMerchant(event.target.value);
              }}
            />
          </label>

          <br />

          <label for="fechaInicio" className=" col-md-6">
            <span>Fecha inicial</span>
            <input
              className="form-control"
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(event) => {
                setFechaInicio(event.target.value);
              }}
            />
          </label>

          <label for="fechaFinal" className=" col-md-6">
            <span>Fecha final</span>
            <input
              className="form-control"
              type="date"
              id="fechaFinal"
              value={fechaFinal}
              onChange={(event) => {
                setFechaFinal(event.target.value);
              }}
            />
          </label>
        </form>
      </div>

      <div className="row">
        <div className="col-12 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => tradeTransactions()}
          >
            Consultar
          </button>
        </div>
      </div>

      {info && (
        <div align="center" className="table-resposive">
          {info ? (
            <table FRAME="void" RULES="cols" className="mt-5">
              <tr>
                <td align="center">
                  <thead>
                    <h4>Información de transacciones</h4>
                  </thead>
                  <table className="mt-2">
                    <tr>
                      <td align="center">
                        <thead className="table-active">
                          <tr>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Referencia</th>
                            <th>Estado</th>
                            <th>Tipo de movimiento</th>
                          </tr>
                        </thead>
                        {info &&
                          info.map((item) => {
                            return (
                              <tbody className="table table-straped">
                                <tr>
                                  <td>{item.amount}</td>

                                  <td>
                                    {item.date ? formatDate(item.date) : false}
                                  </td>

                                  <td>
                                    {item.description
                                      ? item.description
                                      : false}
                                  </td>
                                  <td>{item.status ? item.status : false}</td>
                                  <td>
                                    {item.tipoMovimiento
                                      ? item.tipoMovimiento
                                      : false}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-info"
                                      onClick={() => fetchTxDetail(item)}
                                    >
                                      Detalles
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          ) : (
            false
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export { TradeTransactions };
