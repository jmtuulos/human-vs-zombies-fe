import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppContext from './context/AppContext'
import "./index.css";
import App from "./App";
import { initialize } from "./keycloak";
import Loading from "./components/loading/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Keycloak..." />)

// Initialize Keycloak
initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <AppContext>
          <App />
        </AppContext>
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });
