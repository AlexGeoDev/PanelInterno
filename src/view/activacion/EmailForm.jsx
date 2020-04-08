import React, { Component } from 'react';

class EmailForm extends Component {

  onSubmit = (e) => {
    e.preventDefault();

    const email = this.emailRef.value;

    this.props.onSubmit(email);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Correo cliente:</label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='Correo'
            ref={ref => this.emailRef = ref}
            required
          />
        </div>

        <button
          type='submit'
          className='btn btn-outline-primary'
        >
          Buscar
        </button>
      </form>
    );
  }
}

export default EmailForm;
