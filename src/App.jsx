import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ColorModeContext } from './components/DarkModeProvider';

const drawerWidth = 240;

export default function App() {
  const { toggleColorMode } = useContext(ColorModeContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Lead Automation
      </Typography>
      <List>
        {['Dashboard', 'Flows', 'Create Flow', 'Profile', 'Login', 'Register'].map((text) => (
          <ListItem button key={text} component={Link} to={text === 'Dashboard' ? '/' : '/' + text.toLowerCase().replace(/ /g, '')}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lead Automation
            </Typography>
            <Button color="inherit" onClick={toggleColorMode}>Toggle Theme</Button>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3, width: '100%', mt: 8 }}>
          <Routes>
            import { FlowBuilder } from './components/FlowBuilder';

<Route path="/" element={<FlowBuilder />} />
            import { FlowList } from './components/FlowList';
import { CreateFlow } from './components/CreateFlow';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { Register } from './components/Register';

<Route path="/flows" element={<FlowList />} />
            <Route path="/createflow" element={<CreateFlow />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}