import React, { Component, useImperativeHandle } from 'react';
import EmailForm from './EmailForm';
import UserBusiness from '../../business/UserBusiness';
import './activacion.css'
import ClientDataForm from './ClientDataForm';

class Activacion extends Component {

  state = {
    userNotExist: false,
    userData: null,
    isActivatingClient: false,
  }

  onSubmitEmail = async (email) => {
    const user = await UserBusiness.fetchUserBitrix(email);

    if (user) {
      this.setState({
        userData: user,
      });

    } else {
      this.setState({
        userNotExist: true,
      });

      setTimeout(() => {
        this.setState({
          userNotExist: false,
        });
      }, 2000);
    }
  }

  onSubmitData = async (merchantCode) => {
    const {
      userData,
    } = this.state;

    const data = {
      merchantCode,
      phone: userData.phone,
      companyName: userData.name,
      name: userData.name,
      email: userData.email,
      address: userData.address,
      city: userData.ciudad,
    }

    this.setState({
      isActivatingClient: true,
    });

    const activated = await UserBusiness.activateUser(data);

    this.setState({
      isActivatingClient: false,
    });

    if (activated) {
      alert('Cliente activado correctamente');
    } else {
      alert('Ha ocurrido un error');
    }
  }

  render() {
    const {
      userNotExist,
      userData,
      isActivatingClient,
    } = this.state;

    return (
      <div className='activacion-container container'>

        <h3>
          Activar Cliente
        </h3>

        <div className='row'>
          <div className='col-md-8'>
            <EmailForm
              onSubmit={this.onSubmitEmail}
            />
            {
              userNotExist &&
              <small className='text-danger'>
                Cliente no encontrado
            </small>
            }
          </div>
        </div>

        {
          userData &&
          <div className='row mt-2'>
            <div className='col-md-8'>
              <hr />
              <ClientDataForm
                data={userData}
                isLoading={isActivatingClient}
                onSubmit={this.onSubmitData}
              />
            </div>
          </div>
        }

      </div>
    );
  }
}

export default Activacion;
