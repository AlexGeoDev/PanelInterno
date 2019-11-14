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
        <NavBar />
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-nav">
              <ul className="nav flex-column">

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Asignar merchantcode</span>
                </h6>
              </ul>
            </div>
          </nav>
          <div className="col-md-9">
            {this.props.children}
          </div>
        </div>
        <style jsx>{`
        .navbar{
          justify-content:right
        }
        .sidebar-nav {
          height: calc(100vh - 48px);
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
      </div>
    );
  }
}

export default Layout;