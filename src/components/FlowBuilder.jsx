// src/components/FlowBuilder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const FlowBuilder = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Lead Automation</h1>
      <p className="mb-4">Start creating your lead automation flows easily.</p>
      <Link to="/flows/new" className="bg-blue-600 text-white px-4 py-2 rounded">Create New Flow</Link>
    </div>
  );
};