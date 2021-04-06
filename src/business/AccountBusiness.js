class AccountBusiness {

  static async descargarReporteComisiones(merchantCode, year = '2020') {
    const promise = new Promise((resolve, reject) => {

      fetch('https://api.cajero.co/api/v1/account/export/commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year,
          userName: merchantCode,
          token: 'R2R;pF#<FC{K9e@2E5,[7AGn9/Q8}t96tS^Zb@~_Zg:Ayx#fwQ',
        }),
      })
        .then(async (data) => {
          if (data.status === 200) {
            const blob = await data.blob();
            const urlblob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlblob;
            a.download = merchantCode + '.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();

            resolve(true);

          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error('ERROR', error)
          resolve(false);
        });
    });

    return promise;
  }
}
export default AccountBusiness;