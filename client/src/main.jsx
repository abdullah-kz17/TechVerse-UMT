import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from "./context/AuthContext.jsx";
import {Provider} from "react-redux";
import App from './App.jsx'
import {store} from "./store/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </AuthProvider>
  </StrictMode>,
)
