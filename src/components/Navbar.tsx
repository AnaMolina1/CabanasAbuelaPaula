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
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
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
        // Color y sombra de la barra superior (navbar)
        //backgroundColor: '#c34830ff',
        backgroundColor: '#862e10ff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar
        sx={{
          // Altura dinámica según scroll y tamaño de pantalla
          height: { xs: '64px', sm: isScrolled ? '60px' : '100px' },
          transition: 'height 0.3s ease',
          minHeight: { xs: '64px', sm: 'auto' },
        }}
      >
        {isMobile ? (
          // ✅ VISTA MOBILE
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
                src="/images/logo2.png"
                alt="Logo"
                sx={{
                  height: isMobile ? 55 : 50, // Agrandar logo en mobile
                  ml: 2,
                }}
              />
              {/* Botón hamburguesa para abrir Drawer */}
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  //color: 'white',
                  backgroundColor: '#dba1a1ff', // fondo
                  border: '1px solid #a06c6c', // borde
                  borderRadius: '50%', // forma circular
                  padding: '8px', // espacio interno
                  '&:hover': {
                    backgroundColor: '#836262ff', // más oscuro al hacer hover
                  },
                }}
              >
                <MenuIcon sx={{ color: '#a06c6c' }} />
              </IconButton>
            </Box>

            {/* Drawer lateral para mobile */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: '#b7aca3ff',
                    borderLeft: '2px solid black',
                    width: '160px',
                    height: 'auto', // <== clave
                    maxHeight: '100vh', // <== opcional, seguridad en pantallas chicas
                    alignSelf: 'flex-start', // <== para que quede arriba
                  },
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
                  {/* Ítems del menú público (anclados por ID) */}
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

                  {/* Botón hacia Admin Panel (solo si NO está en ruta admin) */}
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
          // ✅ VISTA ADMIN (modo escritorio): texto centrado
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
                fontWeight: 'normal',
                fontFamily: '"Fredoka", sans-serif',
                fontSize: isScrolled ? '3.3rem' : '3.5rem',
                transition: 'font-size 0.3s ease',
              }}
            >
              Panel Administrador
            </Typography>
          </Box>
        ) : (
          // ✅ Versión pública con logo a la izquierda + botones
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
                      color: activeSection === item.id ? '#E38834' : '#FFFFFF',
                      borderBottom:
                        activeSection === item.id
                          ? '2px solid #E38834'
                          : '2px solid transparent',
                      borderRadius: 0,
                      mx: 1.5,
                      paddingBottom: '4px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#E38834',
                        borderBottom: '2px solid #E38834',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Botón Admin Panel visible también en escritorio */}
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
  );
};

export default Navbar;
