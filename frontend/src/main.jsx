// src/main.jsx (hoặc index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Đảm bảo đúng tên file App của bạn
import './style.css'; // Import toàn bộ CSS của bạn vào đây

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);