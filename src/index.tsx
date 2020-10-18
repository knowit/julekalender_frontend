import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="knowit-julekalender.eu.auth0.com"
    clientId="yAtCtCcXkAkwF4Crd7Cn9Wi10F0mVVc0"
    redirectUri={window.location.origin}
    audience="https://YOUR_DOMAIN/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);