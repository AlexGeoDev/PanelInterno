const BASE_URL = 'https://s.cajero.co/api';
// const BASE_URL = 'http://192.168.10.11:8080/api';

const fetchPagofacilList = async (merchantcode, sequence, bankCode, startDate, endDate) => {
  const url = `${BASE_URL}/panelinterno/fetchPays`;
  const data = {};
  data.body = {
    merchantCode: merchantcode,
    secuencia: sequence,
    codigobanco: bankCode,
    fechaInicio: startDate,
    fechaFinal: endDate
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

const fetchActiveCommerce = async (startDate, endDate) => {
  const url = `${BASE_URL}/paymentorder/listactivemerchants`;
  const data = {};
  data.body = {
    fechaInicio: startDate,
    fechaFinal: endDate
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

const fetchCommerces = async (startDate, endDate) => {
  const url = `${BASE_URL}/paymentorder/listgralmerchant`;
  const data = {};
  data.body = {
    fechaInicio: startDate,
    fechaFinal: endDate
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

const fetchDataInfo = async (merchant) => {
  const url = `${BASE_URL}/login/listemailmerchant`;
  const data = {};
  data.body = {
    merchant
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

const fetchValidateRegister = async (merchant) => {
  const url = `${BASE_URL}/login/validateuserregister`;
  const data = {};
  data.body = {
    merchant
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

const sendPushNotification = async (message, merchantCode) => {
  const url = `${BASE_URL}/push/sendmassivepush`;
  const data = {
    typeMessage: message.typeMessage === 'TEXT' ? null : message.typeMessage,
    body: message.body,
    link: message.link,
    urlImage: message.urlImage,
    title: message.title,
    sound: message.sound,
    merchantCode
  };
  data.header = {};
  console.log('SEND PUSH ------> ', data);

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

const fetchTokenRecover = async (userEmail) => {
  const url = 'https://api.site.cajero.co/api/v1/password/generateresettoken';
  const data = { userEmail };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    return json;
  } catch (e) {
    console.log('error en peticion login' + e);
    return null;
  }
};

const fetchBlackListLog = async (date) => {
  const url = `${BASE_URL}/logs/readCardLog`;
  const data = {};
  data.body = {
    fecha: date,
  };
  data.header = {};

  console.log('DATA', data)

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
}

const sendMassivePush = async (body) => {
  const url = `${BASE_URL}/push/sendmassivepushnotification`;
  const data = {
    header: {},
    body
  };

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

const sendDirectPush = async (body) => {
  const url = `${BASE_URL}/push/senddirectpushnotification`;
  const data = {
    header: {},
    body
  };

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

const sendUnregisterPush = async (body) => {
  const url = `${BASE_URL}/push/sendunregisterpushnotification`;
  const data = {
    header: {},
    body
  };

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
  fetchActiveCommerce,
  fetchTransactionResume,
  fetchCommerces,
  fetchTransactionPaymentResume,
  fetchPaymentResume,
  fetchDataInfo,
  fetchInfoRegister,
  sendPushNotification,
  fetchValidateRegister,
  fetchTokenRecover,
  fetchBlackListLog,
  sendMassivePush,
  sendDirectPush,
  sendUnregisterPush
};