import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './views/user-registration';
import AddProductForm from './views/add-product-form';  // Corrected component name

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/addProduct" element={<AddProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
