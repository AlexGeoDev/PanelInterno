import { IO } from '../api/io';

class CommerceBusiness {

  static async fetchCommerceList(email, date) {
    try {
      const response = await IO.post('commerce/fetchlist', {
        email,
        date,
      });

      if (response && response.data) {
        return response;
      }
    } catch (error) {
      console.log('ERROR FETCHCOMMERCELIST', error);
    }
    return null;
  }

  static async fetchCommerceData(idCommerce) {
    try {
      const response = await IO.post('commerce/fetchdata', {
        idCommerce,
      });

      if (response && response.data) {
        return response;
      }
    } catch (error) {
      console.log('ERROR FETCHCOMMERCELIST', error);
    }
    return null;
  }

  static async downloadDocument(documentId) {
    try {
      const response = await IO.postSite('downloaddocument', {
        documentId,
        securityToken: '9FGg+pYrEzUaWzg4GyPsEtf+--Ur?3?CvGEFk%pmsA&kGd9uPwMW?',
      });

      if (response && response.data) {
        const {
          fileContent,
          fileType,
          fileName,
        } = response.data;

        const buffer = this.base64ToArrayBuffer(fileContent);

        const blob = new Blob([buffer], { type: fileType });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        return true;
      }
    } catch (error) {
      console.log('ERROR DOWLOADDOCUMENT', error);
    }
    return false;
  }

  static async updateCommerceRegistrationStatus(idCommerce, completed) {
    try {
      const response = await IO.post('commerce/updatestatus', {
        idCommerce,
        completed
      });

      if (response && response.data) {
        return response;
      }
    } catch (error) {
      console.log('ERROR UPDATE COMMERCE', error);
    }
    return null;
  }

  static base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
}

export default CommerceBusiness;