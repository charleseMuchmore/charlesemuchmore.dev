// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// In-Project CSS
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import { PProvider } from './context/projects.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(el);
const el = document.getElementById('root');

root.render(
  <React.StrictMode>
    <PProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PProvider>
  </React.StrictMode>

);
reportWebVitals();
