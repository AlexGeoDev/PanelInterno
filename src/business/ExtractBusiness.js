class ExtractBusiness {

    static async descargarExtractoBancario({ userName, startDate, endDate, reportType }) {
        const promise = new Promise((resolve, reject) => {

            fetch('https://api.cajero.co/api/v1/account/export/extract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, startDate, endDate, reportType }),
            })
                .then(async (data) => {
                    if (data.status === 200) {
                        const blob = await data.blob();
                        const urlblob = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = urlblob;
                        a.download = `${userName}-${reportType}.pdf`;
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
export default ExtractBusiness;