import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import 'highlight.js/styles/gruvbox-dark.css';

import App from './App';
import RequestsContext from './RequestsContext';

const Index = () => (
  <BrowserRouter>
    <Auth0Provider
      domain="knowit-konkurranser.eu.auth0.com"
      clientId="6TmycgoSWgFT8EU6COixHKne9JmLx5F4"
      redirectUri={window.location.origin} // TODO: Redirect back to luke
      audience="https://knowit-konkurranser.eu.auth0.com/api/v2/"
    >
      <RequestsContext>
        <App />
      </RequestsContext>
    </Auth0Provider>
  </BrowserRouter>
);

const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<Index />)
}