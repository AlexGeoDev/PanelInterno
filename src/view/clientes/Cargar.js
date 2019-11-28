import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { FileUpload } from '../../components/modal/FileUpload';
import { uploadFile, ID, processFile } from '../../business/transactionBusiness';

function Cargar(props) {
    console.log(props);

    const [files, setFiles] = useState();
    const [filesStatus, setFilesStatus] = useState();

    const status = {};

    return (
        <React.Fragment>
            <div>
                Cargar archivo: {props.type}
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FileUpload onSelectedFiles={(selectedFiles) => {


                        let temporal = [];
                        selectedFiles.forEach(f => {
                            let idFile = ID();

                            status[idFile] = {
                                status: 'loading'
                            };
                            setFilesStatus(status);

                            temporal.push({ idFile: idFile, file: f, name: f.name });


                            uploadFile(f).then(id => {
                                let filesToUpload = { ...status };
                                filesToUpload[idFile] = {};
                                filesToUpload[idFile].id = id.id;
                                filesToUpload[idFile].status = 'loaded';
                                setFilesStatus(filesToUpload);
                            })

                        });

                        setFiles(temporal);
                    }} />
                </div>
                <div className="col-md-8 text-left">
                    <div>
                        <div>
                            {
                                files && files.map(f => {
                                    console.log(f);
                                    console.log(filesStatus);
                                    return (<div key={f.idFile}>
                                        Archivo: {f.name} : [{filesStatus[f.idFile].status}]
                                    </div>);
                                })
                            }

                        </div>

                        <div>
                            <button onClick={() => {

                                if (files) {
                                    files.forEach(f => {
                                        console.log("procesar archivo:", f, filesStatus[f.idFile]);
                                        let event = 'testTransactionPerformed';
                                        if (props.type === 'cyclos') {
                                            event = 'testTransactionReviewed';
                                        }else if (props.type === 'bancolombiawithdrawal') {
                                            event = 'withdrawalRequested';
                                        }else if (props.type === 'bbvawithdrawal') {
                                            event = 'withdrawalRequested';
                                        }
                                        processFile(filesStatus[f.idFile].id, props.type, event, false)
                                    })
                                }





                            }}>Procesar</button>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>
                {
                    `
                .detail{
                    text-align:left;
                }
                `
                }
            </style>

        </React.Fragment>
    );

}

export { Cargar };