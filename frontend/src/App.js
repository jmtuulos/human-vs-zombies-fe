import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import GameDetails from './views/GameDetails';
import AdminTools from './views/AdminTools';
import Profile from './views/Profile';
import KeycloakRoute from './routes/KeycloakRoute';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div style={{ backgroundImage: "url(/images/background.png)" }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/gamedetails" element={<GameDetails />} />
              <Route path="/dashboard" element={<AdminTools />} />
              <Route path="/profile" element={<KeycloakRoute role={"hvz_user"}>
                <Profile />
              </KeycloakRoute>
              } />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
