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

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(

<BrowserRouter>
    <App />
</BrowserRouter>

);