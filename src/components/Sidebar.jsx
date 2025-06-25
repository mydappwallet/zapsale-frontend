import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export const Sidebar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Lead Automation</h2>
      <nav className="space-y-2">
        <Link to="/" className="block hover:text-gray-300">Flow Builder</Link>
        {token && <Link to="/flows" className="block hover:text-gray-300">My Flows</Link>}
        {token && <Link to="/profile" className="block hover:text-gray-300">Profile</Link>}
        {!token && <Link to="/login" className="block hover:text-gray-300">Login</Link>}
        {!token && <Link to="/register" className="block hover:text-gray-300">Register</Link>}
        {token && <button onClick={logout} className="block w-full text-left hover:text-gray-300">Logout</button>}
      </nav>
    </div>
  );
};