const BASE_URL = 'https://s.cajero.co/api';
// const BASE_URL = 'http://192.168.10.18:8080/api';

const validateRegisterUser = (email, merchant) => {
    const url = `${BASE_URL}/login/fetchdataregister`;
    let data = null;
    if (email != null && email != '') {
        data = { body: { email }, header: {} };
    } else {
        data = { body: { merchant }, header: {} };
    }

    return new Promise((resolve, reject) => {
        try {
            const response = fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
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

const fetchDataByEmail = async (correo) => {
    const url = `${BASE_URL}/login/fetchdatabydevice`;
    const data = {
        header: {},
        body: { correo }
    };

    return new Promise((resolve, reject) => {
        try {
            const response = fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
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

const updateUserApp = async (email, merchant, operator, pin, rol, pass) => {
    const url = `${BASE_URL}/login/updateuserapp`;
    const data = {
        header: {},
        body: { email, merchant, operator, pin, rol, pass }
    };

    return new Promise((resolve, reject) => {
        try {
            const response = fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
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

const registerAdmonService = async (email, admin) => {
    const url = `${BASE_URL}/login/registeradmon`;
    const data = {
        header: {},
        body: { email, admin }
    };

    return new Promise((resolve, reject) => {
        try {
            const response = fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            resolve(response);
        } catch (e) {
            console.log('error en peticion', e);
            reject(e);
        }
    })
};

export {
    validateRegisterUser,
    fetchDataByEmail,
    updateUserApp,
    registerAdmonService
};