import React from "react";
import DesktopLayout from "../components/WebDesktop/DesktopLayout";
import Link from "next/link";
import Card from "../components/card";
import { subscribe } from "../business/state";
import transactionBusiness from "../business/transactionBusiness";

class Index extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <DesktopLayout>
        <User />
      </DesktopLayout>
    );
  }
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    subscribe("onSearch", (serial) => {
      var user = transactionBusiness.fetchUserBySerial(serial);
      this.setState({ user });
    })

    subscribe("onSearch", (serial) => {
      console.log("hola!!!")
    })
  }

  render() {



    return (
      <React.Fragment>
        <div>nombre: {this.state.user.nombre} </div>
        <div>Merchant Code: <input></input></div>
        <div><button>Actualizar</button></div>
      </React.Fragment>
    );
  }
}



export default Index;
