import moment from 'moment';

const BASE_URL = 'https://s.cajero.co/api';

/**
 * Retorna los intereses mensuales de llévatelo
 * @returns {
 *    dateAllowed: string date,
 *    interestPercent: number,
 * }
 */
const fetchInterest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/llevatelo/fetchinterest`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: {},
      }),
    });
    const { header, body } = await response.json();

    if (header && header.codigoError === null) {
      return body[0];
    }
  } catch (error) {
    console.log('ERROR FETCH INTEREST', error);
  }

  return null;
};

/**
 * Actualiza la tasa de interés de llévatelo
 * @param {float} interestPercent 
 * @returns 
 */
const registerInterest = async (interestPercent) => {
  try {
    const dateAllowed = moment().format('YYYY-MM-DD');

    const response = await fetch(`${BASE_URL}/llevatelo/registerinterest`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: {
          interestPercent,
          dateAllowed,
        },
      }),
    });
    const { header } = await response.json();

    if (header && header.codigoError === null) {
      return true;
    }
  } catch (error) {
    console.log('ERROR REGISTER INTEREST', error);
  }

  return false;
};

const fetchPurchaseList = async (startDate, endDate, sequence = null) => {
  try {
    const response = await fetch(`${BASE_URL}/llevatelo/fetchpurchasescupocajero`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: {
          fechaInicio: startDate,
          fechaFinal: endDate,
          sequence,
        },
      }),
    });

    const { header, body } = await response.json();

    if (header && header.codigoError === null) {
      return body;
    }
  } catch (error) {
    console.log('ERROR FETCH PURCHASES', error);
  }

  return null;
}

const revertPurchase = async (idPurchase) => {
  try {
    const response = await fetch(`${BASE_URL}/llevatelo/revertpurchase`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: idPurchase,
      }),
    });

    const { header } = await response.json();

    if (header && header.codigoError === null) {
      return true;
    }
  } catch (error) {
    console.log('ERROR REVERT PURCHASE', error);
  }

  return false;
}

/**
 * Consulta si el merchant tiene habilitado el uso de Cupo Cajero
 * @param {*} merchant String
 */
const fetchMerchantUseCupoCajeroStatus = async (merchant) => {

  try {
    const response = await fetch(`${BASE_URL}/llevatelo/fetchcommerceusecc`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: merchant,
      }),
    });

    const { header, body } = await response.json();

    if (header && header.codigoError === null) {
      return body;
    }
  } catch (error) {
    console.log('ERROR FETCH MERCHANT USE', error);
  }

  return false;
}

/**
 * Incrementa el cupo de comercio de un merchant
 * @param {*} data String
 */
const CommerceIncrease = async (data) => {

  const nom = data.body;
  const headers = {
    'Content-Type': 'application/json'
  };
  try {

    let fetchUpdate = await fetch(`${BASE_URL}/llevatelo/updatecommercecredit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        header: {},
        body: nom,
        body: data,
      }),
    })
    const { header, body } = await fetchUpdate.json();

    if (header && header.codigoError === null) {
      return body;
    }
  } catch (error) {
    console.log('ERROR FETCH MERCHANT USE', error);
  }

  return false;
}

const setCommerceUseCupoCajero = async (merchant, status) => {

  try {
    const response = await fetch(`${BASE_URL}/llevatelo/setcommerceusecc`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        header: {},
        body: {
          merchantCode: merchant,
          enable: status,
        },
      }),
    });

    const { header, body } = await response.json();

    if (header && header.codigoError === null) {
      return body;
    }
  } catch (error) {
    console.log('ERROR SET MERCHANT USE CUPO CAJERO', error);
  }

  return false;
}

export default {
  fetchInterest,
  registerInterest,
  fetchPurchaseList,
  revertPurchase,
  fetchMerchantUseCupoCajeroStatus,
  CommerceIncrease,
  setCommerceUseCupoCajero,
};