import React from "react";
import Link from "next/link";
import Head from 'next/head';
import NavBar from "../NavBar";

class Layout extends React.Component {

  render() {
    return (
      <div>
        <Head>
          <title>Cajero - Panel Interno</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
          <link rel="stylesheet" href="/css/all.min.css"></link>
        </Head>
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
              <button className="nuevo"> + Nuevo</button>
            </div>
            <div className="menulist">
              <div>
                <div>

                </div>
                <div>
                  <a href="/usuarios" className="menulist-item">Usuarios</a>
                </div>
              </div>

            </div>
            </div>
            
            <div>
              <ul className="nav flex-column">

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>{this.props.titulo}</span>
                </h6>
                <li className="nav-item">
                  <a href="/listusers" className="nav-link">Listar Usuario</a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">Home</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-10">
            {this.props.children}
          </div>
        </div>
        <style jsx>{`
        .logo-container{
          display:flex;
          color:white;          
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