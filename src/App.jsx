// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { FlowBuilder } from './components/FlowBuilder';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { FlowList } from './components/FlowList';
import { Profile } from './components/Profile';
import { EditFlow } from './components/EditFlow';
import { NewFlow } from './components/NewFlow';

export const AuthContext = React.createContext();

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<FlowBuilder />} />
              <Route path="/flows" element={<FlowList />} />
              <Route path="/flows/new" element={<NewFlow />} />
              <Route path="/flows/:id" element={<EditFlow />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}