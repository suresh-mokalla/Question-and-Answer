import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QnaApp from './QnaApp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/qna" element={<QnaApp />} />
        {/* You can add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
