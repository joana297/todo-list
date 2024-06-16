import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.scss';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/service-worker.js')
    .then(function (registration) {
      console.log('Registrierung ok. Scope: ' + registration.scope);
    })
    .catch(function (error) {
      console.log('Registrierungsfehler. Details: ' + error);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
