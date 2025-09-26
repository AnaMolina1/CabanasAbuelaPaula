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

import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

const publicNavItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Cabañas', id: 'cabañas' },
  { label: 'Ubicación', id: 'ubicacion' },
  { label: 'Contacto', id: 'contacto' },
];

const Navbar: React.FC = () => {
  // en lugar de theme.breakpoints.down('sm')
  const isMobile = useMediaQuery('(max-width: 900px)');
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerWidth = 160; // el ancho que ya usás en el Drawer

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
    <>
      {isMobile && isAdminRoute ? (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: '#a5482eff',
            left: 0,
            right: drawerOpen ? `${drawerWidth}px` : 0, // 👈 el AppBar termina antes del Drawer
            transition: (theme) =>
              theme.transitions.create(['right'], {
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          <Toolbar sx={{ justifyContent: 'center', minHeight: 64 }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Fredoka", sans-serif' }}
            >
              Panel Administrador
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        // 🌐 NAVBAR para público (mobile/escritorio) y admin escritorio
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: '#74210bff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Toolbar
  sx={{
    minHeight: 'auto',
    height: { xs: '64px', sm: '70px' },
    backgroundColor: 'transparent',
  }}
>
            {isMobile ? (
              // 📱 PÚBLICO MOBILE
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
                    component={RouterLink}
                    to="/admin"
                    onClick={handleDrawerToggle} // 👈 esto cierra el drawer
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/logo2.png"
                      alt="Logo"
                      sx={{ height: 55, ml: 2 }}
                    />
                  </Box>
                 <IconButton
  edge="end"
  aria-label="menu"
  onClick={handleDrawerToggle}
  sx={{
    backgroundColor: '#e8e0d0',
    borderRadius: '50%',
    p: '6px',                 // 👈 más chico que 8px
    width: '40px',            // 👈 tamaño fijo opcional
    height: '40px',
    '&:hover': { backgroundColor: '#836262ff' },
  }}
>
  <MenuIcon sx={{ color: '#a06c6c', fontSize: '1.5rem' }} />
</IconButton>

                </Box>
                {/* Drawer lateral para mobile */}
                <Drawer
                  anchor="right"
                  variant="persistent" // 👈 hace que el contenido se “acomode”
                  open={drawerOpen}
                  ModalProps={{ keepMounted: true }}
                  PaperProps={{
                    sx: {
                      width: drawerWidth,
                      mt: '64px', // 👈 que el Drawer empiece debajo del AppBar
                      borderLeft: '2px solid black',
                      backgroundColor: '#b7aca3',
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Box
                      component="img"
                      src="/images/logo2.png"
                      alt="Logo"
                      sx={{
                        height: 50, // ajustá según lo que consideres “bien chiquito”
                        display: 'block',
                        margin: '0 auto',
                        mb: 1,
                      }}
                    />
                    <Divider />
                    <List>
                      {/* Ítems del menú público en mobile */}
                      {publicNavItems.map((item) => (
                        <ListItemButton
                          key={item.label}
                          component="a"
                          href={`#${item.id}`}
                          sx={{
                            borderBottom: '1px solid rgba(18, 18, 18, 0.46)', // línea sutil entre items
                            fontWeight: 400, // sin negrita
                            paddingY: '0.8rem',
                            backgroundColor:
                              activeSection === item.id
                                ? 'rgba(0, 0, 0, 0.05)'
                                : 'transparent',
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

                      {/* Botón hacia Admin Panel en mobile (solo si NO está en ruta admin) */}
                      {!isAdminRoute && (
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
                      )}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : isAdminRoute ? (
              // 💻 ADMIN ESCRITORIO
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: 'normal',
                    fontSize: isScrolled ? '2.5rem' : '2rem',
                  }}
                >
                  Panel Administrador
                </Typography>
              </Box>
            ) : (
              // ✅ SECCIÓN 3: VISTA ESCRITORIO (Pública) con logo a la izquierda + botones
              <>
                {/* Logo en escritorio */}
                <Box
                  component="img"
                  src="/images/logo2.png"
                  alt="Logo"
                  sx={{
                    height: isScrolled ? 50 : 70,
                    transition: 'height 0.3s ease',
                    mr: 3,
                  }}
                />
                {/* Espacio para empujar los botones a la derecha */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Botones de navegación públicos */}
                {!isAdminRoute && (
                  <>
                    {publicNavItems.map((item) => (
                      <Button
                        key={item.label}
                        href={`#${item.id}`}
                        sx={{
                          fontFamily: '"Fredoka", sans-serif',
                          fontWeight: activeSection === item.id ? 600 : 400,
                          fontSize: '1.1rem',
                          textTransform: 'uppercase',
                          color:
                            activeSection === item.id ? '#262f17' : '#e8e0d0',
                          borderBottom:
                            activeSection === item.id
                              ? '2px solid #262f17'
                              : '2px solid transparent',
                          borderRadius: 0,
                          mx: 1.5,
                          paddingBottom: '4px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#262f17',
                            borderBottom: '2px solid #262f17',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}

                    {/* Botón Admin Panel visible en escritorio */}
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
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
      {/* 🔹 ACA VA EL SPACER: SIEMPRE después de cerrar el ternario */}
    {/* 🔹 Espaciador solo en admin */}
{isAdminRoute && (
  <Toolbar sx={{ minHeight: { xs: 64, sm: isScrolled ? 60 : 100 } }} />
)}
    </>
  );
};
export default Navbar;
