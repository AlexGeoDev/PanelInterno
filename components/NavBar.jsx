import React from "react"
import SerialForm from "./SerialForm"
import Link from "next/link";
import { notify } from "../business/state";

class NavBar extends React.Component {
  consultaActivation = (serial) => {
    console.log("ejecucion funcion", serial);
    notify("onSearch",serial);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link href="/">
          <a className="navbar-brand col-md-2 mr-0">Cajero.co</a>
        </Link>
        <SerialForm
          consultaActivation={this.consultaActivation}
        />
      </nav>
    )
  }
}
export default NavBar