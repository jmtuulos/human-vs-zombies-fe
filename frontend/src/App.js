import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import GameDetails from './views/GameDetails';
import AdminTools from './views/AdminTools';
import Profile from './views/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <div  style={{ backgroundImage: "url(/images/background.png)" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gamedetails" element={<GameDetails />} />
          <Route path="/dashboard" element={<AdminTools />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
