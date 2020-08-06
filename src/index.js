import Keycloak from 'keycloak-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

let keycloak = Keycloak('./keycloak.json');
keycloak.init({ onLoad: 'login-required', checkLoginIframe: false, promiseType: 'native' }).success((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
  }

  ReactDOM.render(<App />, document.getElementById('root'));

  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
    keycloak.updateToken(70).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
    });
  }, 60000)
}).error(() => {
  console.error("Authenticated Failed");
});