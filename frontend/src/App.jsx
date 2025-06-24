// src/App.jsx (hoặc App.js)
import React from 'react';
import ProductDetail from './ProductDetail.jsx'; // Import ProductDetail component

function App() {
  return (
    <div className="App"> {/* Có thể thêm class App nếu muốn */}
      <ProductDetail />
    </div>
  );
}

export default App;