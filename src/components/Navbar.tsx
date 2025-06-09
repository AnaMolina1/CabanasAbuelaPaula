import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const publicNavItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Cabañas', id: 'cabañas' },
  { label: 'Ubicación', id: 'ubicacion' },
  { label: 'Contacto', id: 'contacto' },
];

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id;
          }
        });

        if (visibleSection) {
          setActiveSection(visibleSection);
        }
      },
      {
        rootMargin: '-10% 0px -85% 0px', // Detecta antes y para secciones pequeñas
        threshold: 0.1, // Solo requiere que el 10% sea visible
      },
    );

    publicNavItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <AppBar
  position="fixed"
  sx={{
    background: 'linear-gradient(135deg, rgba(249, 208, 126, 0.7), rgba(230, 182, 129, 0.7))', //rgba(255, 250, 240, 0.7), rgba(245, 228, 157, 0.7))',
    backdropFilter: 'blur(10px)', // Efecto de desenfoque bonito detrás
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}
>

      <Toolbar
        sx={{
          height: { xs: '64px', sm: isScrolled ? '60px' : '100px' },
          transition: 'height 0.3s ease',
          minHeight: { xs: '64px', sm: 'auto' },
        }}
      >
        {isMobile ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box
                component="img"
                src="/images/logopng.png"
                alt="Logo"
                sx={{
                  height: 40,
                  ml: 1,
                }}
              />

              <IconButton
                edge="end"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  backgroundColor: '#888', // fondo gris
                  border: '2px solid black', // borde negro
                  borderRadius: '50%', // forma circular
                  padding: '8px', // espacio interno
                  '&:hover': {
                    backgroundColor: '#666', // más oscuro al hacer hover
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              slotProps={{
                paper: {
                sx: {
                  backgroundColor: '#f0f0f0', // gris claro
                  borderLeft: '2px solid black',
                  width: '240px',
                  height: 'auto', // <== clave
      maxHeight: '100vh', // <== opcional, seguridad en pantallas chicas
      alignSelf: 'flex-start', // <== para que quede arriba
                },
                 }
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Menú</Typography>
                <Divider />
                <List>
                  {publicNavItems.map((item) => (
                    <ListItemButton
  key={item.label}
  component="a"
  href={`#${item.id}`}
  sx={{
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // línea sutil entre items
    fontWeight: 400, // sin negrita
    paddingY: '0.8rem',
    backgroundColor:
      activeSection === item.id ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
  }}
  onClick={handleDrawerToggle}
>
  <ListItemText
    primary={item.label}
    primaryTypographyProps={{
      fontFamily: '"Fredoka", sans-serif',
      fontWeight: 400, // sin negrita
      fontSize: '1.1rem',
      color: '#333',
    }}
  />
</ListItemButton>
                  ))}
                  <ListItemButton
                    component={RouterLink}
                    to="/admin"
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText
                      primary="Admin Panel"
                      primaryTypographyProps={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        color: 'black',
                      }}
                    />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box
              component="img"
              src="/images/logopng.png"
              alt="Logo"
              sx={{
                height: isScrolled ? 48 : 80,
                transition: 'height 0.3s ease',
                mr: 2,
              }}
            />
            <Box sx={{ flexGrow: 1 }} />

            {publicNavItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                href={`#${item.id}`}
                sx={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 400,
                  fontSize: '1.3rem',
                  color: '#333',
                  borderBottom:
                    activeSection === item.id ? '2px solid black' : 'none',
borderRight: '1px solid rgba(0, 0, 0, 0.1)', // línea sutil entre botones
    paddingRight: '1rem',
    paddingLeft: '1rem',
    '&:last-of-type': {
      borderRight: 'none', // no poner línea en el último botón
    },
  }}
>                {item.label}
              </Button>
            ))}

            <Button
              color="inherit"
              component={RouterLink}
              to="/admin"
              sx={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#444444',
              }}
            >
              Admin Panel
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
