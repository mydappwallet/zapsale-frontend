import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export const CreateFlow = () => (
  <Paper elevation={3} sx={{ p: 4 }}>
    <Typography variant="h5">Create New Flow</Typography>
    <Typography>Use the visual editor to build your automation.</Typography>
  </Paper>
);