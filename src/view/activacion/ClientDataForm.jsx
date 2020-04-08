import React, { Component } from 'react';

class ClientDataForm extends Component {

  state = {
    merchantCode: '',
  }

  componentWillMount() {
    const {
      merchantCode,
    } = this.props.data;

    if (merchantCode && merchantCode !== 'null') {
      this.setState({
        merchantCode: this.props.data.merchantCode
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      merchantCode,
    } = this.state;

    this.props.onSubmit(merchantCode);
  }

  render() {
    const {
      data,
      isLoading,
    } = this.props;

    const {
      name,
      documentId,
      address,
      phone,
      email,
      ciudad,
    } = data;

    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <label htmlFor='merchant'>Ingrese el Merchant Code:</label>
          <input
            id='merchant'
            type='text'
            className='form-control'
            required
            value={this.state.merchantCode}
            onChange={e =>
              this.setState({
                merchantCode: e.target.value,
              })
            }
          />
        </div>


        <div className='form-group'>
          <label>Nombre:</label>
          <input
            type='text'
            className='form-control'
            value={name}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Número de documento:</label>
          <input
            type='text'
            className='form-control'
            value={documentId}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Dirección:</label>
          <input
            type='text'
            className='form-control'
            value={address}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Teléfono:</label>
          <input
            type='text'
            className='form-control'
            value={phone}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Correo:</label>
          <input
            type='text'
            className='form-control'
            value={email}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Ciudad:</label>
          <input
            type='text'
            className='form-control'
            value={ciudad}
            disabled
          />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          disabled={isLoading}
        >
          Activar
        </button>
      </form>
    );
  }
}

export default ClientDataForm;
