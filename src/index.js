import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js';

/* let keycloak = Keycloak('keycloak.json');

function refreshToken(kc) {

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
    refreshToken(kc)
  }, 60000)

} */

ReactDOM.render(<App />, document.getElementById('root'));


/* keycloak.init({ onLoad: 'login-required' }).success((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
  }

  refreshToken(keycloak);

  //start io
  window.KEYCLOAK = keycloak;

  window.URLBASE = "https://api.blazarsolutions.co/";

  console.log('proyecto iniciado');

  ReactDOM.render(<App />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  /*window.start(()=>{

  });*/

/*

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
}); */



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
