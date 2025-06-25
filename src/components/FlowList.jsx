import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const FlowList = () => {
  const flows = [
    { id: 1, name: 'Welcome Series' },
    { id: 2, name: 'Lead Nurturing' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>My Flows</Typography>
      <List>
        {flows.map(flow => (
          <ListItem key={flow.id} component={Link} to={`/editflow/${flow.id}`} button>
            <ListItemText primary={flow.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};