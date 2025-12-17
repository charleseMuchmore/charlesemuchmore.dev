import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'; //add Navigate later
import React, { useEffect, useState, useContext } from 'react';

//pages
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Learning from './pages/Learning';
import History from './pages/History';
import Interests from './pages/Interests';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

import ProjectsContext from './context/projects';
// import { AuthProvider } from './context/authcontext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [message] = useState('');
    const { fetchProjects } = useContext(ProjectsContext);

    useEffect(() => {
        fetchProjects();
    }, []); 

    return (
      <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/History" element={<History />} />
          <Route path="/Interests" element={<Interests />} />
          <Route path="/Contact" element={<Contact />} />
          <Route 
            path="/Admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>             
      </Routes>
      <div>{message}</div>
    </div>
    );
}

export default App;