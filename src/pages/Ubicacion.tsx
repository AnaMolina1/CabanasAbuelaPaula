import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleMap, Marker } from '@react-google-maps/api';
import '../styles/ubicacion.css';

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
    <Container maxWidth="lg" className="ubicacion-section">
      {/* Título */}
      <Typography variant="h3" className="ubicacion-title">
        Dónde estamos
      </Typography>

      <Box className="map-container">
        

        {/* Mapa */}
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

        {/* Botón Cómo llegar */}
        <Button onClick={handleOpenInMaps} className="ubicacion-btn">
          Cómo llegar
        </Button>
      </Box>
    </Container>
  );
};

export default Ubicacion;
