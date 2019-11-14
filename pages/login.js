import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

class Login extends React.Component {

  render() {
    return (
      <div>
        <Head>
          <title>Cajero - Cyclos</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
          <link rel="stylesheet" href="/css/all.min.css"></link>
        </Head>
        <div className="row">
          <div className="container-fluid col-md-6 logInfo">
            <div>
              <img className="Logo" src="/Image/Logo-cajero.png" alt="Ingreso al panel Back office de cajero.co"/>
            </div>
            <div>
              <h1 className="centertitle">Acceso al Sistema</h1>
            </div>
            <p className="textInfo">
              texto de inicio al Sistema
            </p>
          </div>
          <div className="container-fluid col-md-6 loginForm">
            <form>
              <div>
                <h1 className="titleForm">Iniciar Sesión</h1>
              </div>
              <div className="form-group username">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Ingresa tu usuario" />
              </div>
              <div className="form-group password">                
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ingresa tu password" />
              </div> 
              <div className="row linkbuttons">
                <div className="col-md-6">
                  <Link href="/login">
                    <a>¿Olvidaste la contraseña</a>
                  </Link>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-primary buttonForm">Acceder</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      <style jsx>{`
        .row {
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .logInfo {
          background-color: #DADFDD;
        }
        input {
          width: 70%;
        }
        .Logo {
          margin: 30px;
          height : 100px;
          weidht : 150px;
        }
        .centertitle {
          margin-top: 50px;
          margin-down: 20;
          display: flex; 
          justify-content: center;
          align-items: center;
        }
        .textInfo {
          display: flex; 
          justify-content: center;
          align-items: center;
        }
        .titleForm {
          margin-top: 150px;
          display: flex; 
          justify-content: center;
          align-items: center;
        }
        .username, .password {
          margin-top: 15px;
          display: flex; 
          justify-content: center;
          align-items: center;
        }
        linkbuttons {
          justify-content: center;
          align-items: center;
        }
      `}</style>
      </div>
    );
  }
}; 


export default Login;