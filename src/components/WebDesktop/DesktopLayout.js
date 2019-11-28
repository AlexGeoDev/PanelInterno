import React from "react";
import { Modal } from '../modal/Modal';
class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {
          this.state.modal &&
          <div>
            {this.state.modal}
          </div>
        }
        <div className="row">
          <nav className="col-md-2">
            <div className="menu">
              <div className="logo-container">
                <div>
                  Logo
              </div>
                <div>
                  Search
              </div>
              </div>
              <div>
                <button className="nuevo" onClick={() => {
                  this.setState({
                    modal: <Modal>
                      <React.Fragment>
                        <a href="/cargar?type=smartpesa">Cargar Smartpesa</a>
                        <a href="/cargar?type=cyclos">Cargar Cyclos</a>
                        <a href="/cargar?type=bancolombiawithdrawal">Cargar Pago Bancolombia</a>
                        <a href="/cargar?type=bbvawithdrawal">Cargar Pago BBVA</a>
                      </React.Fragment>


                    </Modal>
                  })
                }}> + Nuevo</button>
              </div>
              <div className="menulist">
                <div>
                  <div>

                  </div>
                  <div className="menulist-item">
                    <a href="/clientes" className="menulist-link">Clientes</a>
                  </div>
                </div>

              </div>
            </div>
          </nav>
          <div className="col-md-10">
            <div className="header">

            </div>
            <div>
              {this.props.children}
            </div>

          </div>
        </div>
        <style jsx>{`
        .logo-container{
          display:flex;
          color:white;          
        }
        .header{
          height:3rem;
          border-bottom-color: rgb(237, 240, 242);
          border-bottom-style:solid;
          border-bottom-width:1px;
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
        .menulist-item{
          color:white;
          text-align: left;
        }
        .menulist-link{
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
      `}</style>
      </div >
    );
  }
}

export default Layout;