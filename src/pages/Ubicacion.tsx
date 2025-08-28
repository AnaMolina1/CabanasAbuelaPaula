import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Coordenadas de Tanti, Córdoba, Argentina
const tantiCenter = {
  lat: -31.3547972,
  lng: -64.592479,
};

const Ubicacion: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.google || !google.maps) return; // ✅ Verificamos que la API de Google Maps está cargada
  }, []);

  // Función para abrir Google Maps en una nueva pestaña
  const handleOpenInMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${tantiCenter.lat},${tantiCenter.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Container maxWidth={false} sx={{ marginTop: 0, padding: '1rem' }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontFamily: '"Cinzel", serif',
          fontWeight: 'bold',
          color: '#ffffffff',
        }}
      >
        Ubicación
      </Typography>

      {/* 🔵 Mapa + Botón flotante */}
      <Box sx={{ position: 'relative', marginTop: '2rem' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={tantiCenter}
          zoom={17}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
        >
          {mapLoaded && <Marker position={tantiCenter} />}
        </GoogleMap>

        <Button
          onClick={handleOpenInMaps}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
            color: 'white',
            fontWeight: 500,
            fontFamily: '"Fredoka", sans-serif',
            paddingX: 2,
            paddingY: 1,
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              background: 'linear-gradient(135deg, #1E88E5, #00BCD4)',
            },
          }}
        >
          Abrir en Google Maps
        </Button>
      </Box>
    </Container>
  );
};

export default Ubicacion;
