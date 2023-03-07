import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import GameDetails from './views/GameDetails';
import AdminTools from './views/AdminTools';
import Profile from './views/Profile';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gamedetails" element={<GameDetails />} />
          <Route path="/dashboard" element={<AdminTools />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
