class transactionBusiness {
  static async fetchUserBySerial(serial) {
    const data = await this.getSegmetBySerial(serial);
    return data;
  };

  static async getSegmetBySerial(serial) {
    const url = "http://10.199.128.20:8282/api/v1/fetchuserbyserial";
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
      const responseData = json.data;
      console.log(responseData);
      return responseData;
    } catch (e) {
      console.log("error en peticion login" + e);
      return null;
    }
  }

  static async updateSegment(idbd, merchantcode) {
    const url = "http://10.199.128.20:8282/api/v1/identifyuser";
    const data = {
      merchantcode: merchantcode,
      id: idbd
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
      const responseData = json.data;
      console.log(responseData);
      return responseData;
    } catch (e) {
      console.log("error en peticion login" + e);
      return null;
    }
  }

}



export default transactionBusiness