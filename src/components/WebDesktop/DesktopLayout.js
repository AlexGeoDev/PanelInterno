import React from 'react';
import { Modal } from '../modal/Modal';
import MenuLink from '../MenuLink';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      listMenu: [
        {
          url: '/clientes',
          name: 'Clientes'
        },
        {
          url: '/cargar?type=tvc',
          name: 'Transacciones TVC'
        },
        {
          url: '/registros',
          name: 'Registros'
        },
        {
          url: '/comercios',
          name: 'Registros Comercios'
        },
        {
          url: '/listPagoFacil',
          name: 'PagoFácil'
        },
        {
          url: '/sendPush',
          name: 'Enviar Notificaciones'
        },
        {
          url: '/verifyInfo',
          name: 'Verificar Registro'
        },
        {
          url: '/unifiedLogin',
          name: 'Registro Login'
        },
        {
          url: '/utils',
          name: 'Utilidades Cajero'
        },
        {
          url: '/setAdminUser',
          name: 'Asignar Administrador/Operador'
        },
        {
          url: '/logsApps',
          name: 'Logs Transacciones'
        },
        {
          url: '/logs-listasnegras',
          name: 'Logs listas negras PagoFácil'
        },
        {
          url: '/paymentInfo',
          name: 'Informacion Pago Datafonos'
        },
        {
          url: '/reporte-retenciones',
          name: 'Reporte Retenciones'
        },
        {
          url: '/facturacion',
          name:'Facturación'
        },
        {
          url: '/intereses-llevatelo',
          name: 'Intereses llévatelo'
        },
        {
          url: '/transacciones-cupocajero',
          name: 'Transacciones Cupo Cajero'
        }
      ]
    };
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { listMenu } = this.state;
    return (
      <div className='app-container'>
        {this.state.openModal &&
          <Modal onClose={this.closeModal}>
            <React.Fragment>
              <a href='/cargar?type=smartpesa'>Cargar Smartpesa</a>
              <a href='/cargar?type=cyclos'>Cargar Cyclos</a>
              <a href='/cargar?type=bancolombiawithdrawal'>Cargar Pago Bancolombia</a>
              <a href='/cargar?type=bbvawithdrawal'>Cargar Pago BBVA</a>
            </React.Fragment>
          </Modal>
        }

        <div className='row mx-0 h-100'>
          <nav className='col-md-2 px-0 h-100'>
            <div className='menu'>
              <div className='logo-container d-flex flex-column'>
                <div className='my-4'>
                  <img
                    src='/image/logo-blanco.png'
                    width='150'
                  />
                </div>
              </div>

              <button className='nuevo' onClick={() => {
                this.setState({
                  openModal: true
                })
              }}>
                + Nuevo
              </button>

              <div className='menulist'>
                {listMenu &&
                  listMenu.map(menu =>
                    <MenuLink
                      key={menu.url}
                      url={menu.url}
                      name={menu.name}
                    />
                  )
                }
              </div>
            </div>
          </nav>

          <div className='col-md-10 px-0 h-100'>
            <div className='header'>

            </div>

            <div className='px-3 py-4 content overflow-y'>
              {this.props.children}
            </div>
          </div>
        </div>

        <style jsx>
          {
            `
              .app-container {
                height: 100vh;
              }

              .logo-container{
                display:flex;
                color:white;
              }

              .header{
                height: 10vh;
                border-bottom-color: rgb(237, 240, 242);
                border-bottom-style:solid;
                border-bottom-width:1px;
              }

              .content {
                height: 90vh;
              }

              .nuevo{
                background-color:#007fd2;
                border:0;
                border-radius:3px;
                color:white;
                width:100%;
              }

              .menu{
                background-color: #0c2a4b;
                padding-bottom:1rem;
                padding-left:1rem;
                padding-right:1rem;
              }

              .menulist{
                color:white;
              }

              .navbar{
                justify-content:right
              }

              .sidebar-nav {
                height: calc(100vh - 48px);
                overflow-x: hidden;
                overflow-y: auto;
              }
            `
          }
        </style>
      </div >
    );
  }
}

export default Layout;