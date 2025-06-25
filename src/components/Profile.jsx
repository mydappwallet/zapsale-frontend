import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export const Profile = () => (
  <Paper elevation={3} sx={{ p: 4 }}>
    <Typography variant="h5">Profile</Typography>
    <Typography>Email: user@example.com</Typography>
    <Typography>Role: Admin</Typography>
  </Paper>
);