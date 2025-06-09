import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import auth from '../firebase/auth';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';

const drawerWidth = 240;

const adminMenuItems = [
  { label: 'Gestionar Clientes', path: '/admin/clientes' },
  { label: 'Gestionar Reservas', path: '/admin/reservas' },
  { label: 'Gestionar Cabañas', path: '/admin/cabañas' },
  { label: 'Disponibilidad Cabañas', path: '/admin/disponibilidad' },
  ];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      console.log('Cerrando sesión...');
      await signOut(auth);
      console.log('Sesión cerrada, redirigiendo...');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return user ? (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en dispositivos móviles
        }}
        sx={{
          width: isMobile ? '100%' : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? '100%' : drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {adminMenuItems.map((item) => (
              <ListItemButton 
                key={item.label} 
                component={Link} 
                to={item.path} 
                onClick={() => setMobileOpen(false)} // Cerrar menú al hacer clic
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {/* Botón para cerrar sesión */}
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
            {/* Botón para salir sin cerrar sesión */}
            <ListItemButton component={Link} to="/" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Salir" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  ) : null;
};

export default AdminLayout;
