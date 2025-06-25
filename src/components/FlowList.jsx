// src/components/FlowList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

export const FlowList = () => {
  const { token } = useContext(AuthContext);
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const fetchFlows = async () => {
      const res = await fetch('https://backend.zapsale.com.pl/flows/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFlows(data);
      }
    };
    fetchFlows();
  }, [token]);

  const deleteFlow = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flow?')) return;
    const res = await fetch(`https://backend.zapsale.com.pl/flows/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setFlows(flows.filter(f => f.id !== id));
    else alert('Failed to delete flow');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Saved Flows</h1>
      <ul className="space-y-2">
        {flows.map(flow => (
          <li key={flow.id} className="p-4 border rounded bg-white shadow flex justify-between items-center">
            <div>
              <Link to={`/flows/${flow.id}`} className="text-blue-600 font-bold">
                {flow.name}
              </Link><br />
              <small>Saved: {new Date(flow.created_at).toLocaleString()}</small>
            </div>
            <button
              onClick={() => deleteFlow(flow.id)}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};