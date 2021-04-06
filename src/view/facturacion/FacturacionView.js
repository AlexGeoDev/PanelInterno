import React, { useEffect, useState } from 'react';
import readXls from "../../lib/utils/readXls";

const Papa = require('papaparse');

function FacturacionView() {

    const [consolidadoTable, setConsolidadoTable] = useState([]);
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState({});
    const [loadingMessage, setLoadingMessage] = useState("");
    const hiddenFileInput = React.createRef();

    const handleImport = (file,ext)=> {
        //ReadXls
        if(ext == "xls" || ext == "xlsx"){
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const buffer = reader.result;
                //import utilities
                readXls(buffer).then((data)=>{
                    loadLote(data);
                });
            }
        }else {
            //ReadCsv
            Papa.parse(file,{
                delimiter:";",
                header:true,
                skipEmptyLines:true,
                complete: function(result){
                    updateData(result);
                }
            })
        }
    }
    const updateData = (result) =>{
        var data = result.data
        var parsedData = data.map((item)=>{
            item.Amount = parseInt(item.Amount);
            item['com var'] = parseInt(item['com var']);
            item.impuestocomision = parseInt(item.impuestocomision);
            return item;
        })
        var reducer = parsedData.reduce((acc,item)=>{
            if(acc[item.Merchant]){
                acc[item.Merchant]['Amount'] += item['Amount'];
                acc[item.Merchant]['com var'] += item['com var'];
                acc[item.Merchant]['impuestocomision'] += item['impuestocomision'];
            }
            else{
                acc[item.Merchant] = item;
            }
            return acc;
        }, {})
        var ConsolidateData = Object.values(reducer);

        var NewConsolidateData = ConsolidateData.map(object =>{
            object.lote  = ''
            object.comvar = object['com var']
            delete object['com var']
            return object;
        })
        loadLote(NewConsolidateData);
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        const ext = event.target.files[0].name.split(".")
        if(ext[1] == "xls" || ext[1] == "xlsx"){
            setError("");
            setLoadingMessage("");
            handleImport(fileUploaded,ext[1])
        }else if(ext[1] == "csv"){
            setError("");
            setLoadingMessage("");
            handleImport(fileUploaded,ext[1])
            
        }else{
            setError("Por favor introduzca archivos .csv o .xslx");
            setLoadingMessage("");
            setConsolidadoTable([]);
        }
        
    };

    //Function to process Billing
    const handleProcessBilling = () =>{
        setConsolidadoTable([]);
        setLoadingMessage("Este proceso puede tardar unos minutos, por favor espere")
        const { extraData } = responseData;
        var lote = {lote:extraData}
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch('https://panelinterno.cajero.co/services/api/v1/processbilling',{
            method: 'POST',
            headers,
            body: JSON.stringify(lote),
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw new Error(res)
            }
        })
        .then(() => {
            setLoadingMessage(`${lote.lote}` + ' ' + 'cargado satisfactoriamente')
        }).catch(err => {
            console.log(err);
        })
    }

    //function to check billing status (since it's takes a lot)
    const handleCheckStatus = () =>{
        const { extraData } = responseData;
        var lote = {lote:extraData}
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch('https://panelinterno.cajero.co/services/api/v1/getconsolidadobylote',{
            method: 'POST',
            headers,
            body: JSON.stringify(lote),
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw new Error(res)
            }
        })
        .then(response => {
            if(Array.isArray(response.extraData && !response.extraData.length && response.extraData !== null)){
                setLoadingMessage(`${responseData.extraData}` + ' ' + 'Procesado satisfactoriamente')
            }else{
                setLoadingMessage(`${responseData.extraData}` + ' ' + 'Aún esta siendo procesado')
            }
            
        }).catch(err => {
            console.log(err);
        })
    }

    //function to show errorMessage
    const errorText = () =>{
        if(error !== ""){
            return <p style={{color: "red", marginTop:"4vh"}}>{error}</p>
        }else{
           return <p></p>
        }
    }

    //function to show loadingMessage
    const loadingText = () =>{
        if(loadingMessage !== ""){
            return <p style ={{color: "green", marginTop:"4vh", fontStyle: 'italic', fontSize: '18px'}}>{loadingMessage}</p>
        }else{
            return <p></p>
        }
    }

    //Function to Load Lote 
    const loadLote = (content) =>{
        var body = {data:content}
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch('https://panelinterno.cajero.co/services/api/v1/loadlote',{
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw new Error(res)
            }
        })
        .then(response => {
            setConsolidadoTable(content)
            setResponseData(response);
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <React.Fragment>
            <div>
                <input
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    type="file"
                    style={{ display: "none" }}
                    multiple={false}
                />
                <button
                    type="button"
                    className="mx-2 btn btn-outline-primary center "
                    onClick={()=>handleClick()}
                >
                    Cargar Archivo
                </button>
                {consolidadoTable.length !==0 ?
                    <button
                    type="button"
                    className="mx-2 btn btn-outline-primary right"
                    onClick={()=>handleProcessBilling()}
                    >
                        Procesar facturación
                    </button>:<div style={{display:'none'}}></div>
                }
                {
                    loadingMessage.length != ''?
                    <button
                    type="button"
                    className="mx-2 btn btn-outline-primary right"
                    onClick={()=>handleCheckStatus()}
                    >
                        Chequear lote
                    </button>:
                    <p></p>
                }
                {errorText()}
                {loadingText()}
               
            </div>
            <div className="mt-3">
                {consolidadoTable.length !==0 ?
                    <table id= "data">
                        <thead>
                            <tr>
                                <th>Merchant</th>
                                <th>Amount</th>
                                <th>Com Var</th>
                                <th>Impuesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidadoTable.map((data)=>{
                                return(
                                    <tr key={data.authcode}>
                                        <td>{data.Merchant}</td>
                                        <td>{data.Amount}</td>
                                        <td>{data.comvar}</td>
                                        <td>{data.impuestocomision.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    :<p></p>
                }
            </div>
                
            <style jsx>{`
                .center{
                    justify-content: center;
                    width: 200px;

                }
                .right{
                    float:right;
                    clear:both;
                    width: 200px;
                    margin-right:10vw
                }
                #data {
                text-align: center;
                font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                border: 3px solid #ddd;
                width: 100%;
                
                }
                
                #data td, #data th {
                border: 1px solid #ddd;
                padding: 8px;
                }
                
                #data tr:nth-child(even){background-color: #f2f2f2;}
                
                #data tr:hover {background-color: #ddd;}
                
                #data th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: center;
                background-color: #007bff;
                color: white;
                }
            `}</style> 
        </React.Fragment>
    );
}

export default FacturacionView;