import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js';


function refreshToken() {
  console.log("refresh keycloak token!!!");
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

  setTimeout(() => {
    refreshToken()
  }, 60000)
}

let keycloak = Keycloak('keycloak.json');
keycloak.init({ onLoad: 'login-required' }).success((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
  }
  console.log('proyecto iniciado');
  ReactDOM.render(<App />, document.getElementById('root'));

  refreshToken();
});

serviceWorker.unregister();