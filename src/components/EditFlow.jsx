// src/components/EditFlow.jsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export const EditFlow = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchFlow = async () => {
      const res = await fetch(`http://localhost:5000/flows/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setNodes(data.data.nodes || []);
        setEdges(data.data.edges || []);
      }
    };
    fetchFlow();
  }, [id, token]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const updateFlow = async () => {
    const res = await fetch(`http://localhost:5000/flows/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: { nodes, edges } })
    });
    if (res.ok) {
      alert('Flow updated');
      navigate('/flows');
    } else alert('Failed to update flow');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Flow: {name}</h1>
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
      <button onClick={updateFlow} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Update Flow</button>
    </div>
  );
};