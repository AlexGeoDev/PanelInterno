import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { Link, useCurrentRoute } from 'react-navi'
import { Modal } from '../../components/modal/Modal';
import { identify, sendCredentials, trackEvent, syncUsers } from '../../business/transactionBusiness';



function Identify(props) {

    const [merchatCode, setMerchantCode] = useState("");

    return (
        <React.Fragment>
            <div>
                <div>
                    Identificar por merchantcode
                </div>
                <div>
                    <span>Merchant Code:</span><span><input value={merchatCode} onChange={e => setMerchantCode(e.target.value)} /></span>
                </div>
                <div>
                    <button onClick={
                        async () => {
                            identify(props.user.id, merchatCode);
                        }
                    }>Identificar</button>
                </div>
            </div>
        </React.Fragment >

    );
}

function Clientes(props) {

    let { data } = useCurrentRoute()
    const [selected, setSelected] = useState();
    const [action, setAction] = useState();
    console.log('Clientes', props, data);

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
            {action &&
                <div>{action}</div>
            }
            <div>
                <span>Lista de clientes</span><span></span>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <Table data={data.data} onSelect={handleSelect} />
                </div>
                <div className="col-md-3">
                    <div>
                        {selected &&
                            <div className="detail">
                                <div>{selected.identification} - {selected.comercialName}</div>
                                <div>{selected.serialNumber}</div>
                                <div>Cuenta: {selected.accountNumber}</div>
                                <div>

                                </div>
                                <div>
                                    <div>
                                        Acciones
                                </div>
                                    <div>
                                        <div>
                                            <button onClick={() => {
                                                setAction(<Modal onClose={() => setAction(null)}
                                                    footer={
                                                        <button onClick={() => setAction(null)}>Cerrar</button>
                                                    }
                                                >
                                                    <Identify user={selected} />
                                                </Modal>);
                                            }
                                            }>identificar</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                sendCredentials(selected.id)
                                            }}>credentialsSent</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                trackEvent(selected.id, 'testTransactionPerformed', false)
                                            }}>testTransactionPerformed</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                trackEvent(selected.id, 'testTransactionReviewed', false)
                                            }}>testTransactionReviewed</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                trackEvent(selected.id, 'withdrawalRequested', false)
                                            }}>withdrawalRequested</button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                trackEvent(selected.id, 'withdrawalRecieved', false)
                                            }}>withdrawalRecieved</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        }

                    </div>


                    <div className="acciones">
                        <button onClick={() => syncUsers()}>Sincronizar Clientes</button>
                        <div>
                            <a href="/cargar?type=smartpesa">Cargar Smartpesa</a>
                        </div>
                        <div>
                            <a href="/cargar?type=cyclos">Cargar Cyclos</a>
                        </div>
                        <div>
                            <a href="/cargar?type=bancolombiawithdrawal">Cargar Pago Bancolombia</a>
                        </div>
                        <div>
                            <a href="/cargar?type=bbvawithdrawal">Cargar Pago BBVA</a>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>
                {
                    `
                .detail{
                    text-align:left;
                    margin-bottom:2rem;
                }

                .acciones{
                    text-align:left;
                }
                `
                }
            </style>

        </React.Fragment>
    );

}

export { Clientes };