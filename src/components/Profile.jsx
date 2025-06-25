// src/components/Profile.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';

export const Profile = () => {
  const { token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email);
      }
    };
    fetchProfile();
  }, [token]);

  const updateProfile = async () => {
    const res = await fetch('http://localhost:5000/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email })
    });
    if (res.ok) setMessage('Profile updated successfully');
    else setMessage('Failed to update profile');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded w-full mb-2" />
      <button onClick={updateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};