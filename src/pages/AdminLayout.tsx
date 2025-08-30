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

import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CabinIcon from '@mui/icons-material/Cabin';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

const drawerWidth = 240;

const adminMenuItems = [
  {
    label: 'CLIENTES',
    path: '/admin/clientes',
    icon: <PeopleIcon />,
  },
  {
    label: 'RESERVAS',
    path: '/admin/reservas',
    icon: <CalendarMonthIcon />,
  },
  { label: 'CABAÑAS', path: '/admin/cabañas', icon: <CabinIcon /> },
  {
    label: 'DISPONIBILIDAD ',
    path: '/admin/disponibilidad',
    icon: <EventAvailableIcon />,
  },
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
    // Contenedor principal con display 'flex'
    <Box sx={{ display: 'flex' }}>
      {/* ✅ BOTÓN MENU HAMBURGUESA (solo visible en MOBILE) */}
      {isMobile && (
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1300,
            color: '#333', // ícono oscuro
            backgroundColor: '#fdf7f2',
            border: '1px solid #333',
            '&:hover': {
              backgroundColor: '#e6ded7',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* ✅ DRAWER LATERAL (menú de navegación del admin) */}
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
            backgroundColor: '#9f9c9cff',
          },
        }}
      >
        {/* Espacio para que no se solape con el AppBar 
        <Toolbar />*/}

        {/* ✅ LOGO o link clickeable a /admin  */}
        <Box
          component={Link}
          to="/admin"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            src="/images/logo2.png"
            alt="Logo"
            sx={{
              width: '120px',
            }}
          />
        </Box>
        {/* ✅ LISTA DE ÍTEMS DEL MENÚ ADMIN */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <List>
            {adminMenuItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  px: 3,
                  py: 1.8,
                  borderBottom: '1px solid #090808ff',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                />
              </ListItemButton>
            ))}

            {/* ✅ BOTÓN "SALIR" (vuelve al inicio público) */}
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => setMobileOpen(false)}
              sx={{
                px: 3,
                py: 1.8,
                borderBottom: '1px solid #ddd',
                '&:hover': {
                  backgroundColor: '#e8f5e9',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ExitToAppIcon sx={{ color: '#095a94ff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Salir"
                primaryTypographyProps={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '1.05rem',
                  color: '#095a94ff',
                }}
              />
            </ListItemButton>

            {/* ✅ BOTÓN "CERRAR SESIÓN" */}
            <ListItemButton
              onClick={handleLogout}
              sx={{
                px: 3,
                py: 1.8,
                borderTop: '1px solid #bbb',
                borderBottom: '1px solid #ddd',
                '&:hover': {
                  backgroundColor: '#fce4e4',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon sx={{ color: '#a11c1c' }} />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar sesión"
                primaryTypographyProps={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 500,
                  fontSize: '1.05rem',
                  color: '#a11c1c',
                }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* ✅ CONTENIDO PRINCIPAL (Outlet renderiza la ruta hija) */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espaciador para no solaparse con AppBar */}
        <Outlet />{' '}
        {/* Aquí se renderizan las pantallas hijas como "HomeAdmin", "GestionarClientes", etc. */}
      </Box>
    </Box>
  ) : null; // Si no hay usuario, no renderiza nada
};

export default AdminLayout;
