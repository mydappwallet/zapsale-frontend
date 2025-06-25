// src/components/NewFlow.jsx
import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

export const NewFlow = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const saveNewFlow = async () => {
    const res = await fetch('https://backend.zapsale.com.pl/flows/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, data: { nodes, edges } })
    });
    if (res.ok) {
      alert('New flow saved');
      navigate('/flows');
    } else alert('Failed to save new flow');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Flow</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Flow name"
        className="mb-4 p-2 border rounded w-full"
      />
      <div style={{ height: 600 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <button onClick={saveNewFlow} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Save Flow</button>
    </div>
  );
};