import React, { Fragment, useState } from 'react';
import ExtractBusiness from '../../business/ExtractBusiness';
import 'react-datepicker/dist/react-datepicker.css'

const ExtractForm = () => {

    const [datos, setDatos] = useState({
        userName: '',
        startDate: '',
        endDate: '',
        reportType: '',
        visible: false
    })
    const handleInputChance = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = async (event) => {
        event.preventDefault();
        console.log(datos.userName + datos.startDate + datos.endDate + datos.reportType)
        const status = await ExtractBusiness.descargarExtractoBancario(datos);
        setDatos({
            userName: '',
            startDate: '',
            endDate: '',
            reportType: '',
            visible: false
        });
        if (status) {
            alert('Extracto bancario descargado exitosamente')
        } else {
            alert('Falló la descarga, por favor revise sus datos.')
        }
    }

    return (
        <Fragment>
            <h1>Generar Extracto</h1>
            <form id="create-course-form" className="form" onSubmit={enviarDatos}>
                <div className='form-group mb-2'>
                    <input
                        autoComplete="off"
                        required
                        placeholder="userName"
                        className='form-control'
                        type="text"
                        name="userName"
                        value={datos.userName}
                        onChange={handleInputChance}
                    ></input>
                </div>
                <div className='form-group mb-2'>
                    <input
                        autoComplete="off"
                        required
                        placeholder="startDate"
                        className='form-control'
                        type="date"
                        name="startDate"
                        value={datos.startDate}
                        onChange={handleInputChance}
                    ></input>
                </div>
                <div className='form-group mb-2'>
                    <input
                        autoComplete="off"
                        required
                        placeholder="endDate"
                        className='form-control'
                        type="date"
                        name="endDate"
                        value={datos.endDate}
                        onChange={handleInputChance}
                    ></input>
                </div>
                <div className='form-group mb-2'>
                    <input value="hiddenValue"
                        type="hidden"
                        disabled
                        placeholder="reportType"
                        className='form-control'
                        name="reportType"
                        onChange={handleInputChance}
                    ></input>
                </div>
                <div className='form-group mb-2'>
                    <button
                        className='btn btn-primary mb-2 ml-3' type="submit"
                    >Procesar</button>
                </div>
            </form>
        </Fragment>
    );

}

export default ExtractForm;