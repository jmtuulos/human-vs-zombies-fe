import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import GameDetails from './views/GameDetails';
import AdminTools from './views/AdminTools';
import Profile from './views/Guides';
import KeycloakRoute from './routes/KeycloakRoute';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import keycloak from './keycloak';
import { useEffect } from 'react';
import { getAllPlayersByUuid, registerUser } from './api/user';
import { useAppUser } from './context/AppUserContext';
import Guides from './views/Guides';

const queryClient = new QueryClient()
function App() {

  const { appUser, setAppUser } = useAppUser()

  useEffect(() => {
    if (keycloak.token !== undefined) {
      registerUser()
      getAllPlayersByUuid().then(function (value) {
        setAppUser(value)
      })
    } else {
      setAppUser(null)
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div id='app' className="App">
          <Navbar />
          <div style={{ backgroundImage: "url(/images/background.png)" }}>
            <Routes>
              <Route path="/guides" element={<Guides />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/gamedetails" element={
                <KeycloakRoute role={"hvz_user"}>
                  <GameDetails />
                </KeycloakRoute>} />
              <Route path="/dashboard" element={<KeycloakRoute role={"hvz_admin"}>
                <AdminTools />
              </KeycloakRoute>} />
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
