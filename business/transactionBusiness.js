class transactionBusiness {
  static async fetchUserBySerial(serial) {
    const data = await this.getSegmetBySerial(serial);
    return { nombre: serial };
  };

  static async getSegmetBySerial(serial) {
    const url = "http://10.199.35.25:8282/api/v1/fetchuserbyserial ";
    const data = {
      serial: serial
    };
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      });

      const json = await response.json();
      console.log(json);
      const { comercialName, email } = json.data;

      return {
        comercialName,
        email,
      };
    } catch (e) {
      console.log("error en peticion login" + e);
      return null;
    }
  }
}

export default transactionBusiness