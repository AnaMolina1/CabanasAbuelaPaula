import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { LoadScriptNext } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import OnePage from './pages/OnePage';
import AdminLayout from './pages/AdminLayout';
import AdminPanel from './pages/AdminPanel';
import AdminCabañas from './pagesAdmin/AdminCabañas';
import AdminReservas from './pagesAdmin/AdminReservas';
import Disponibilidad from './pagesAdmin/Disponibilidad';
import AdminClientes from './pagesAdmin/AdminClientes';
import Login from './components/Login';
import { useMediaQuery, useTheme } from '@mui/material';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAPhTUyWhtxRddVNHKv3OmFIprkuwSgUGY';

// ✅ Nuevo componente AppContent que usa useLocation() dentro del Router
const AppContent: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdminRoute = location.pathname.startsWith('/admin'); // Detecta si la ruta es /admin/*

  return (
    <Box
  sx={{
    width: '100%',
    minHeight: '100vh',
    pt: '64px',
    background: 'linear-gradient(135deg, #c4ae8aff, #e8e0d0) !important', 
   backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

      {/* Oculta el Navbar solo en móviles cuando la ruta es /admin */}
      {!(isAdminRoute && isMobile) && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Página única con scrollspy */}
        <Route path="/" element={<OnePage />} />

        {/* Rutas de administración */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route path="cabañas" element={<AdminCabañas />} />
          <Route path="reservas" element={<AdminReservas />} />
          <Route path="disponibilidad" element={<Disponibilidad />} />
          <Route path="clientes" element={<AdminClientes />} />
        </Route>

        {/* Ruta comodín redirige a OnePage */}
        <Route path="*" element={<OnePage />} />
      </Routes>
    </Box>
  );
};

// ✅ App.tsx ahora solo define <Router> y renderiza <AppContent />
const App: React.FC = () => {
  return (
    <LoadScriptNext
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      loadingElement={<></>} // oculta el loading spinner
    >
      <Router>
        <AppContent />
      </Router>
    </LoadScriptNext>
  );
};
export default App;
