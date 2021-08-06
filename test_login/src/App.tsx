import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/loginPage/login';
import './App.css';

function App() {
  return (
    <Router>
          <Route path='/' exact component={Login} />
    </Router>
  );
}

export default App;
