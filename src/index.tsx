import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider
    domain="knowit-konkurranser.eu.auth0.com"
    clientId="6TmycgoSWgFT8EU6COixHKne9JmLx5F4"
    redirectUri={window.location.href} //Denne må kanskje endrast?
    //audience="https://YOUR_DOMAIN/api/v2/" TODO HOST på APIET
    scope="read:current_user update:current_user_metadata" //TODO: Lag scopes i backend? Sjekk opp
  >
    <App />
  </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);