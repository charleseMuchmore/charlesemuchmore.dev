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
import { ExperiencesProvider } from './context/experiences.js';
import { JoyProvider } from './context/joy.js';
import { JournalProvider } from './context/journal.js';
import { AuthProvider } from './context/authcontext.js';
import './index.css';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PProvider>
        <ExperiencesProvider>
          <JoyProvider>
            <JournalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </JournalProvider>
          </JoyProvider>
        </ExperiencesProvider>
      </PProvider>
    </AuthProvider>
  </React.StrictMode>
);
