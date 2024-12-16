import {Routes, Route} from 'react-router-dom'; //add Navigate later
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

//pages
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Learning from './pages/Learning';
import History from './pages/History';
import Interests from './pages/Interests';
import Contact from './pages/Contact';

import ProjectsContext from './context/projects';

function App() {
    //const [message, setMessage] = useState('');
    const { fetchProjects } = useContext(ProjectsContext);

    useEffect(() => {
        fetchProjects();
    }); 

    // useEffect(() => {
    //     axios.get('http://localhost:3001/')
    //         .then(response => setMessage(response.data))
    //         .catch(error => console.error('Error:', error));
    // }, []);

    return (
        <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/History" element={<History />} />
          <Route path="/Interests" element={<Interests />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>             
      </Routes>
    </div>
    );
}

export default App;