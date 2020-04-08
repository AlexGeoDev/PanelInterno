import { IO } from "../api/io";

class UserBusiness {

  static async fetchUserBitrix(email) {
    try {
      const response = await IO.post('getuserbitrix', {
        email
      });

      if (response.data) {
        return response.extraData;
      }

    } catch (error) {
      console.error('ERROR FETCH USER FROM BITRIX', error);
    }

    return null;
  }

  static async activateUser(data) {
    try {
      const response = await IO.post('activateuserback', data);

      console.log(response)

      if (response.data) {
        return true;
      }

    } catch (error) {
      console.error('ERROR ACTIVATING USER', error);
    }

    return false;
  }
}

export default UserBusiness;
