import './App.css';
import {Routes, Route} from 'react-router-dom'; //add Navigate later

//pages
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Learning from './pages/Learning';
import History from './pages/History';
import Interests from './pages/Interests';
import Contact from './pages/Contact';

function App() {
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
