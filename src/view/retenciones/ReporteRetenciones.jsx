import React, { Component } from 'react';
import './reporte-retenciones.css'
import AccountBusiness from '../../business/AccountBusiness';

class ReporteRetenciones extends Component {

  state = {
    hasError: false,
    isLoading: false,
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const merchantCode = this.merchantInput.value;
    const year = this.yearRef.value;

    this.setState({
      isLoading: true,
    });

    const success = await AccountBusiness.descargarReporteComisiones(merchantCode, year);

    this.setState({
      isLoading: false,
    });

    this.merchantInput.value = '';

    if (!success) {
      this.setState({
        hasError: true,
      });

      setTimeout(() => {
        this.setState({
          hasError: false,
        });
      }, 3000);
    }
  }

  render() {
    const {
      hasError,
      isLoading,
    } = this.state;

    return (
      <div className='retenciones-container'>
        <h3>Descargar reporte de retenciones</h3>
        <form
          className='form-retenciones'
          onSubmit={this.onSubmit}
        >
          <div>
            <label>Año</label>
            <select ref={ref => this.yearRef = ref}>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
            </select>
          </div>
          <label htmlFor='username'>
            Ingrese el merchant code
          </label>
          <input
            id='username'
            type='text'
            ref={ref => this.merchantInput = ref}
            required
          />
          {
            hasError &&
            <span className='export-error'>
              Ha ocurrido un error, es posible que el merchant code sea incorrecto
            </span>
          }

          <button
            disabled={isLoading}
            type='submit'
          >
            Descargar
          </button>
        </form>
      </div>
    );
  }
};

export default ReporteRetenciones;
