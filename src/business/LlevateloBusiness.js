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

export default {
  fetchInterest,
  registerInterest,
};