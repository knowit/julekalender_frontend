import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

import '@trendmicro/react-popover/dist/react-popover.css';

ReactDOM.render(
  <Auth0Provider
    domain="knowit-julekalender.eu.auth0.com"
    clientId="yAtCtCcXkAkwF4Crd7Cn9Wi10F0mVVc0"
    redirectUri={window.location.href} //Denne må kanskje endrast?
    //audience="https://YOUR_DOMAIN/api/v2/" TODO HOST på APIET
    scope="read:current_user update:current_user_metadata" //TODO: Lag scopes i backend? Sjekk opp
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
