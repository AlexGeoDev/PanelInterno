const BASE_URL = "http://10.199.128.20:8282/";

class transactionBusiness {
  static async fetchUserBySerial(serial) {
    const data = await this.getSegmetBySerial(serial);
    return data;
  }

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
}

const identify = async (idbd, merchantcode) => {
  const url = `${BASE_URL}api/v1/identifyuser`;
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
};

const sendCredentials = async idbd => {
  const url = `${BASE_URL}api/v1/sendcredentials`;
  const data = {
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
};

const trackEvent = async (idbd, event, multiple) => {
  const url = `${BASE_URL}api/v1/trackevent`;
  const data = {
    id: idbd,
    event,
    multiple
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
};

const listUsersSegment = async (idbd, merchantcode) => {
  const url = `${BASE_URL}api/v1/fetchallusers`;
  const data = {};
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
};

function uploadFile(file) {
  let req = new Promise(ok => {
    fetch(`${BASE_URL}fileupload`, {
      // Your POST endpoint
      method: "POST",
      headers: {
        "Content-Type": "'text/plain; charset=x-user-defined-binary'"
      },
      body: file // This is your file object
    })
      .then(response => {
        response.json().then(data => {
          ok(data);
        });
      })
      .then()
      .catch();
  });

  return req;
}

var ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const processFile = async (fileId, fileType, event, multiple) => {
  const url = `${BASE_URL}api/v1/processfile`;
  const data = {
    fileId,
    event,
    multiple,
    fileType
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
};

const sendTransactionData = async fileId => {
  const url = `${BASE_URL}api/v1/sendtransactions`;
  const data = {
    fileId
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
};

function syncUsers(file) {
  let req = new Promise(ok => {
    fetch(`${BASE_URL}api/v1/syncusers`, {
      // Your POST endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json().then(data => {
          ok(data);
        });
      })
      .then()
      .catch();
  });

  return req;
}

const listRegistros = async (idbd, merchantcode) => {
  const url = `${BASE_URL}api/v1/fetchallclients`;
  const data = {};
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
};

const sendData = async email => {
  const url = `https://api.site.cajero.co/api/v1/fetchregistrationdata`;
  const data = {
    email: email
  };

  try {
    const response = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${window.KEYCLOAK.token}`
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
};

export {
  uploadFile,
  ID,
  listUsersSegment,
  identify,
  sendCredentials,
  trackEvent,
  processFile,
  syncUsers,
  sendTransactionData,
  listRegistros,
  sendData
};
