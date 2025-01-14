import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './views/user-registration';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration/>} />
      </Routes>
    </Router>
  );
};

export default App;
