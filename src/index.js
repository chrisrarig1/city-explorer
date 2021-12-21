import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
  domain="dev-45qyrjq6.us.auth0.com" //These are in your account
  clientId="t6mA82oC20mWTI3pxOEnBHeIougbUC9g" //In account
  redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>,
  document.getElementById("root")
);



