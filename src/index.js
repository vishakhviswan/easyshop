import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ShopContextProvider from "./Context/ShopContext";
import AuthContextProvider, { FirebaseContext } from './Context/FirebaseContext'
import db from "./Firebase/config"
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ db }}>
      <AuthContextProvider>
        <ShopContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ShopContextProvider>
      </AuthContextProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
