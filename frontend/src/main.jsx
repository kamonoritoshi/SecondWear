// src/main.jsx (hoặc index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './css/style.css'; // Import toàn bộ CSS của bạn vào đây

const CLIENT_ID = "962767938427-unh4l3o5qv0osvvbift024bl2f64tf7v.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);