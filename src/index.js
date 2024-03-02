import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ShopContextProvider from "./Context/ShopContext";
import firebaseConfig from './Firebase/config'
import { initializeApp } from 'firebase/app'
import AuthContextProvider, { FirebaseContext } from './Context/FirebaseContext'
import db from "./Firebase/config"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ db }}>
      <AuthContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthContextProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
