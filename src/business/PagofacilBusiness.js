const BASE_URL = 'https://s.cajero.co/api';
//const BASE_URL = 'http://192.168.10.11:8080/api';

const fetchPagofacilList = async (merchantcode, sequence, bankCode) => {
  const url = `${BASE_URL}/panelinterno/fetchPays`;
  const data = {};
  data.body = {
    merchantCode: merchantcode,
    secuencia: sequence,
    codigobanco: bankCode
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};


const fetchTransactionResume = async (idPaymentOrder) => {
  const url = `${BASE_URL}/paymentorder/fetchbyid`;
  const data = {};
  data.body = {
    id: idPaymentOrder
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

const fetchTransactionPaymentResume = async (idPaymentOrder) => {
  const url = `${BASE_URL}/paymentorder/fetchtransactionbyidorder`;
  const data = {};
  data.body = {
    id: idPaymentOrder
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

const fetchPaymentResume = async (idPaymentOrder) => {
  const url = `${BASE_URL}/paymentorder/fetchtransactionpago`;
  const data = {};
  data.body = {
    id: idPaymentOrder
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

const fetchDataInfo = async (email, serial) => {
  const url = `${BASE_URL}/login/fetchdatabydevice`;
  const data = {};
  data.body = {
    correo: email,
    serialCajero: serial
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

const fetchInfoRegister = async (merchantCode) => {
  const url = `${BASE_URL}/panelinterno/fetchemailsanddevices`;
  const data = {};
  data.body = {
    merchantCode: merchantCode
  };
  data.header = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log("JSON", json);
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

export {
  fetchPagofacilList,
  fetchTransactionResume,
  fetchTransactionPaymentResume,
  fetchPaymentResume,
  fetchDataInfo,
  fetchInfoRegister
};