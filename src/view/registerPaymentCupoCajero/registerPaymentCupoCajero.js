import { resolve } from "navi";
import React, { useState } from "react";
import { registerPaymentCupoCajero } from "../../business/PagofacilBusiness";
import { ModalConfirm } from "../../components/modalConfirm/ModalConfirm";

function RegisterPaymentCupoCajero() {
  const [secuencia, setSecuencia] = useState();
  const [infoRP, setInfoRP] = useState();

  const [confirmInfo, setConfirmInfo] = useState({
    showModal: false,
    title: "",
    message: "",
    onAccept: null,
  });

  const transactionRegisterPayment = async () => {
    if (secuencia.startsWith("LVO")) {
      debugger;
      const fetchRegisterPayment = await registerPaymentCupoCajero(secuencia);
      if (fetchRegisterPayment.body) {
        let infoModal = { ...confirmInfo };
        infoModal.showModal = true;
        infoModal.title = "OK";
        infoModal.message = "El pago se ha efectuado exitosamente.";
        infoModal.onAccept = () => {
          let infoCerrar = { ...confirmInfo };
          infoCerrar.showModal = false;
          setConfirmInfo(infoCerrar);
        };
        setConfirmInfo(infoModal);
      } else {
        let infoModal = { ...confirmInfo };
        infoModal.showModal = true;
        infoModal.title = "OK";
        infoModal.message = "Se ha presentado un error con el pago";
        infoModal.onAccept = () => {
          let infoCerrar = { ...confirmInfo };
          infoCerrar.showModal = false;
          setConfirmInfo(infoCerrar);
        };
        setConfirmInfo(infoModal);
      }
    } else {
      let infoModal = { ...confirmInfo };
      infoModal.showModal = true;
      infoModal.title = "OK";
      infoModal.message = "La secuencia debe empezar por LVO";
      infoModal.onAccept = () => {
        let infoCerrar = { ...confirmInfo };
        infoCerrar.showModal = false;
        setConfirmInfo(infoCerrar);
      };
      setConfirmInfo(infoModal);
    }
  };

  return (
    <React.Fragment>
      {confirmInfo.showModal && (
        <ModalConfirm
          title={confirmInfo.title}
          message={confirmInfo.message}
          onAccept={confirmInfo.onAccept}
        />
      )}
      <div>
        <h4>Registrar Pago Cupo Cajero</h4>
      </div>

      <div>
        <div>
          <label>
            <span>Secuencia: </span>
            <input
              className="form-control"
              placeholder="LVO..."
              type="text"
              value={secuencia}
              onChange={(event) => {
                console.log(event.target.value);
                setSecuencia(event.target.value);
              }}
            />
          </label>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => transactionRegisterPayment()}
        >
          PAGAR
        </button>
      </div>
    </React.Fragment>
  );
}

export { RegisterPaymentCupoCajero };
