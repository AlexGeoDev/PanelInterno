import React, { useState } from 'react';
import readXls from "../../lib/utils/readXls";

const Papa = require('papaparse');

function FacturacionView() {

    const [consolidadoTable, setConsolidadoTable] = useState([]);
    const [error, setError] = useState("");

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
                    setConsolidadoTable(data);
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
    
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        //In order to use .getMonth()
        var todayDate = new Date(Date.now())
        var NewConsolidateData = ConsolidateData.map(object =>{
            object.lote  = `${Date.now()}` + `-${monthNames[todayDate.getMonth()-1]}` + '-Sin_Facturar'
            object.estado = "Sin facturar";
            object.nota = "";
            return object;
        })
        setConsolidadoTable(NewConsolidateData);
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        const ext = event.target.files[0].name.split(".")
        if(ext[1] == "xls" || ext[1] == "xlsx"){
            setError("");
            //this.setState({...this.state, error: ""})
            handleImport(fileUploaded,ext[1])
        }else if(ext[1] == "csv"){
            setError("");
            //this.setState({...this.state, error: ""})
            handleImport(fileUploaded,ext[1])
            
        }else{
            setError("Por favor introduzca archivos .csv o .xslx");
            setConsolidadoTable([]);
            //this.setState({...this.state, error: "Por favor introduzca archivos .csv o .xslx",consolidadoTable:[] })
        }
        
    };
    const handelProcesarFacturacion = () =>{
        console.log("Procesar Facturacion")
    }
    //in order to switch errors
    const errorText = () =>{
        if(error !== ""){
            return <p style={{color: "red", marginTop:"4vh"}}>{error}</p>
        }else{
           return <p></p>
        }
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
                    onClick={()=>handelProcesarFacturacion()}
                    >
                        Procesar facturación
                    </button>:<div></div>
                }
                {errorText()}
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
                                <th>Estado</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidadoTable.map((data)=>{
                                return(
                                    <tr key={data.authcode}>
                                        <td>{data.Merchant}</td>
                                        <td>{data.Amount}</td>
                                        <td>{data["com var"]}</td>
                                        <td>{data.impuestocomision}</td>
                                        <td>{data.estado}</td>
                                        <td>{data.nota}</td>
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