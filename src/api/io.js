export class IO {

  static BASE_URL = '/services/';
  static URL = `${this.BASE_URL}api/v1/`

  static SITE_BASE_URL = 'https://api.site.cajero.co/';
  static SITE_URL = `${this.SITE_BASE_URL}api/v1/`

  static post(url, content) {
    const promise = new Promise((resolve, reject) => {

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      fetch(`${this.URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(content),
      })
        .then((data) => {
          switch (data.status) {
            case 200:
              resolve(data.json())
              break;
            case 401:
              // reject({ error: 'PASSWORD' });
              window.localStorage.clear();
              window.location.replace('/');
              break;
            case 403:
              // reject({ error: 'PASSWORD' });
              window.localStorage.clear();
              window.location.replace('/');
              break;
            default:
              reject({ error: 'SYSTEM' });
              break;
          }
        })
        .catch((error) => {
          console.log('ERROR', error);
          reject({ error: 'SYSTEM' });
        });
    });

    return promise;
  }

  static postSite(url, content) {
    const promise = new Promise((resolve, reject) => {

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      fetch(`${this.SITE_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(content),
      })
        .then((data) => {
          switch (data.status) {
            case 200:
              resolve(data.json())
              break;
            case 401:
              // reject({ error: 'PASSWORD' });
              window.localStorage.clear();
              window.location.replace('/');
              break;
            case 403:
              // reject({ error: 'PASSWORD' });
              window.localStorage.clear();
              window.location.replace('/');
              break;
            default:
              reject({ error: 'SYSTEM' });
              break;
          }
        })
        .catch((error) => {
          console.log('ERROR', error);
          reject({ error: 'SYSTEM' });
        });
    });

    return promise;
  }
}