import React, { useCallback, useEffect, useState } from 'react';
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
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const FlowBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/flows/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setNodes(data.data.nodes);
          setEdges(data.data.edges);
        });
    }
  }, [id]);

  const saveFlow = async () => {
    const res = await fetch(`${API_URL}/flows/${id || 'save'}`, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, data: { nodes, edges } })
    });
    if (res.ok) {
      alert('Flow saved');
      navigate('/flows');
    } else alert('Save failed');
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit Flow' : 'Create Flow'}</Typography>
      <TextField
        label="Flow name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ height: '60vh', mb: 2 }}>
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
      </Box>
      <Button variant="contained" onClick={saveFlow}>Save Flow</Button>
    </Paper>
  );
};