const BASE_URL = "/services/";

const fetchPaymentList = async (body) => {
  const url = `${BASE_URL}api/v1/fetchpaymentlist`;
  return new Promise((resolve, reject) => {
    try {
      const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      resolve(response);
    } catch (e) {
      console.log('error en peticion login', e);
      reject(e);
    }
  })
};

export {
  fetchPaymentList
};