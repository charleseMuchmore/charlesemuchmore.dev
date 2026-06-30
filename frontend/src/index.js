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
import { JobsProvider } from './context/jobs.js';
<<<<<<< HEAD
import { JoyProvider } from './context/joy.js';
import { JournalProvider } from './context/journal.js';
=======
>>>>>>> 2458c0f97b563011d96edc6ff1774ccf536af4bd
import { AuthProvider } from './context/authcontext.js';
import './index.css';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PProvider>
        <JobsProvider>
<<<<<<< HEAD
          <JoyProvider>
            <JournalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </JournalProvider>
          </JoyProvider>
=======
          <BrowserRouter>
            <App />
          </BrowserRouter>
>>>>>>> 2458c0f97b563011d96edc6ff1774ccf536af4bd
        </JobsProvider>
      </PProvider>
    </AuthProvider>
  </React.StrictMode>
);
