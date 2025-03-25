import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Use Routes instead of Switch
import Login from './Login';
import Register from './Register';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <h1>Task Management App</h1>


        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />  {/* Default route */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;