import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  fetchTransactionInfo,
  fetchTransactionTrace,
} from "../../business/PagofacilBusiness";

function TransactionInfo() {
  const [secuencia, setSecuencia] = useState();
  const [infoBD, setInfoBD] = useState();
  const [infoCyclos, setInfoCyclos] = useState();
  const [infoTrace, setInfoTrace] = useState();

  const formatDate = (date) => {
    return date ? moment(date).format("yyyy-MM-DD") : "";
  };

  const transactionInfo = async () => {
    const fetchInfo = await fetchTransactionInfo(secuencia);
    setInfoBD(fetchInfo.body);
    setInfoCyclos(fetchInfo.extraData);

    const fetchTrace = await fetchTransactionTrace(secuencia);
    setInfoTrace(fetchTrace.body);

    debugger;
  };

  return (
    <React.Fragment>
      <div>
        <label>
          <span>Secuencia: </span>
          <input
            type="text"
            value={secuencia}
            onChange={(event) => {
              console.log(event.target.value);
              setSecuencia(event.target.value);
            }}
          />
        </label>
        <button onClick={() => transactionInfo()}>Consultar</button>
      </div>

      <div></div>

      <div align="center">
        <table FRAME="void" RULES="cols" className="mt-5">
          <tr>
            <td>
              <table width="300px">
                <tr>
                  <td align="center">
                    <b>Información BD</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.amount ? "amount: " + infoBD.amount : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.cyclosType
                          ? "cyclosType: " + infoBD.cyclosType
                          : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.date
                          ? "date: " + formatDate(infoBD.date)
                          : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.description
                          ? "description: " + infoBD.description
                          : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.idLVOTransaction
                          ? "idLVOTransaction: " + infoBD.idLVOTransaction
                          : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.SPTransaction
                          ? "id SPTransaction:" + infoBD.SPTransaction
                          : false}
                      </div>
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.refundApproveCode
                          ? "refundApproveCode:" + infoBD.refundApproveCode
                          : false}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.refundSequence
                          ? "refundSequence: " + infoBD.refundSequence
                          : false}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.status ? "status: " + infoBD.status : false}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {infoBD && (
                      <div>
                        {infoBD.tipoMovimiento
                          ? "tipoMovimiento: " + infoBD.tipoMovimiento
                          : false}
                      </div>
                    )}
                  </td>
                </tr>
              </table>
            </td>

            {infoCyclos && (
              <td>
                {infoCyclos ? (
                  <table className="ml-5">
                    <tr>
                      <td align="center">
                        <b> Información Cyclos</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.amount
                              ? "amount: " + infoCyclos.amount
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.cyclosType
                              ? "cyclosType: " + infoCyclos.cyclosType
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.date
                              ? "date: " + formatDate(infoCyclos.date)
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.description
                              ? "description: " + infoCyclos.description
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.idLVOTransaction
                              ? "idLVOTransaction: " +
                                infoCyclos.idLVOTransaction
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.idSPTransaction
                              ? "idSPTransaction:" + infoCyclos.idSPTransaction
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.refundApproveCode
                              ? "refundApproveCode:" +
                                infoCyclos.refundApproveCode
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.refundSequence
                              ? "refundSequence: " + infoCyclos.refundSequence
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.status
                              ? "status: " + infoCyclos.status
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.tipoMovimiento
                              ? "tipoMovimiento: " + infoCyclos.tipoMovimiento
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.txDateSP
                              ? "txDateSP: " + infoCyclos.txDateSP
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && (
                          <div>
                            {infoCyclos.txType
                              ? "txType: " + infoCyclos.txType
                              : false}
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {infoCyclos && <div>{"Detalle de transacción: "}</div>}
                      </td>
                    </tr>

                    <tr>
                      <td align="center">
                        {infoCyclos &&
                          infoCyclos.listDetailDesc &&
                          infoCyclos.listDetailDesc.map((item) => {
                            return (
                              <div className="d-flex align-items-center border-bottom">
                                <div>{item.amount}</div>
                                <div className="mx-3">
                                  {" " + formatDate(item.date)}
                                </div>
                                <div>{item.description}</div>
                              </div>
                            );
                          })}
                      </td>
                    </tr>
                  </table>
                ) : (
                  false
                )}
              </td>
            )}
          </tr>
        </table>

        <table className="mt-5">
          <tr>
            <td align="center">
              <b>Histórico de datos</b>
            </td>
          </tr>
          <tr>
            <td>
              {infoTrace &&
                infoTrace.map((item) => {
                  return (
                    <table>
                      <tr>
                        <td>{"Estado: " + item.detail}</td>
                      </tr>

                      <tr>
                        <td>
                          {"Fecha de registro: " +
                            formatDate(item.registerDate)}
                        </td>
                      </tr>
                      <tr>
                        <td>{"Secuencia: " + item.sequence}</td>
                      </tr>
                    </table>
                  );
                })}
            </td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
}

export { TransactionInfo };
