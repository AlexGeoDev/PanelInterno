import { IO } from '../api/io';

const fetchDatafonoPrice = async () => {
  try {
    const response = await IO.post('product/fetchprice');

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('ERROR FETCH PRICE', error);
  }

  return null;
};

const createDiscountCoupon = async (discount) => {
  try {
    const response = await IO.post('product/createcoupon', {
      discount,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('ERROR CREATE COUPON', error);
  }

  return null;
};

export {
  fetchDatafonoPrice,
  createDiscountCoupon,
};