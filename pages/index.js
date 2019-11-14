import React from "react";
import DesktopLayout from "../components/WebDesktop/DesktopLayout";
import Link from "next/link";
import Card from "../components/card";
import { subscribe, remove } from "../business/state";
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
    this.state = { user: {}, merchantCode: "" };
  }

  async getData(serial) {
    var user = await transactionBusiness.fetchUserBySerial(serial);
    console.log(user);
    this.setState({ user });
  }

  componentDidMount() {
    if (!this.idsubscribe) {
      this.idsubscribe = subscribe("onSearch", (serial) => {
        this.getData(serial);
      })      
    }
  }
  componentWillUnmount() {
    remove("onSearch", this.idsubscribe);
  }

  render() {



    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div><span>Id:</span> {this.state.user.id} </div>
          <div><span>Comercial Name:</span> {this.state.user.comercialName} </div>
          <div><span>Business Name:</span> {this.state.user.businessName} </div>
          <div><span>Email:</span> {this.state.user.email} </div>
          <div><span>Identification:</span> {this.state.user.identification} </div>
          <div><span>Merchant Code:</span> <input required={true} onChange={e => this.setState({ merchantCode: e.target.value })} value={this.state.merchantCode} ></input></div>
          <div><button type="submit">Actualizar</button></div>
        </form>
      </React.Fragment>
    );
  }

  handleSubmit = (e) => {
    console.log("send data:", this.state.merchantCode, this.state.user);
    const update = transactionBusiness.updateSegment(this.state.user.id, this.state.merchantCode)
    e.preventDefault();
  }
}



export default Index;
