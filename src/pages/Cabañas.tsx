import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import {
  LocalParking as LocalParkingIcon,
  AcUnit as AcUnitIcon,
  Wifi as WifiIcon,
  Pool as PoolIcon,
  OutdoorGrill as OutdoorGrillIcon,
  Tv as TvIcon,
  Kitchen as KitchenIcon,
  Whatshot as WhatshotIcon,
  Microwave as MicrowaveIcon,
  Pets as PetsIcon,
  Bed as BedIcon,
  DryCleaning as DryCleaningIcon,
} from '@mui/icons-material';
import '../styles/cabins.css';


interface Cabin {
  id: string;
  nombre: string;
  capacidad: number;
  ubicacion: string;
  descripcion: string;
}

const Cabañas: React.FC = () => {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const imagenes = [
    '/images/imgcabañas/cabaña1.jpg',
    '/images/imgcabañas/cabaña2.jpg',
    '/images/imgcabañas/cabaña3.jpg',
    '/images/imgcabañas/cabaña4.jpg',
    '/images/imgcabañas/cabaña5.jpg',
    '/images/imgcabañas/cabaña6.jpg',
  ];

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cabanas'));
        const cabinsData: Cabin[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Cabin[];

        const sortedCabins = cabinsData.sort((a, b) =>
          a.nombre.localeCompare(b.nombre),
        );
        setCabins(sortedCabins);
      } catch (error) {
        console.error('Error al obtener cabañas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabins();
  }, []);

  return (
    <Container maxWidth="lg" className="cabins-section">
      {/* Título principal */}
      <Typography
  variant="h3"
  className="galeria-title"
  sx={{
    fontSize: { xs: "2.2rem", md: "2.7rem" }, // responsive directo
    fontFamily: "var(--font-section)",
    fontWeight: "bold",
    color: "var(--color-terracota)",
  }}
>
        Nuestras Cabañas
      </Typography>

      {/* Sección Comodidades */}
      <Box className="comodidades-box">
        <Typography variant="h4" className="comodidades-title"
          >
          Comodidades
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {[
            { icon: <LocalParkingIcon fontSize="large" />, label: 'Cochera' },
            { icon: <AcUnitIcon fontSize="large" />, label: 'Aire Acond.' },
            { icon: <WifiIcon fontSize="large" />, label: 'WiFi' },
            { icon: <PoolIcon fontSize="large" />, label: 'Pileta' },
            { icon: <OutdoorGrillIcon fontSize="large" />, label: 'Asadores' },
            { icon: <TvIcon fontSize="large" />, label: 'Televisión' },
            { icon: <KitchenIcon fontSize="large" />, label: 'Cocina' },
            { icon: <WhatshotIcon fontSize="large" />, label: 'Calefacción' },
            { icon: <MicrowaveIcon fontSize="large" />, label: 'Microondas' },
            { icon: <PetsIcon fontSize="large" />, label: 'Mascotas' },
            { icon: <BedIcon fontSize="large" />, label: 'Ropa de cama' },
            {
              icon: <DryCleaningIcon fontSize="large" />,
              label: 'Ropa blanca',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="comodidad-item"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box>{item.icon}</Box>
              <Typography variant="body2">{item.label}</Typography>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Tarjetas de Cabañas */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cabins.map((cabin, index) => (
            <Grid item xs={12} sm={6} md={4} key={cabin.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="cabin-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={imagenes[index] || '/images/default.jpg'}
                    alt={cabin.nombre}
                  />
                  <CardContent className="cabin-card-content">
                    <Typography variant="h6" className="cabin-card-title">
                      {cabin.nombre}
                    </Typography>
                    <Typography variant="body2" className="cabin-card-text">
                      <strong>Capacidad:</strong> {cabin.capacidad} personas
                    </Typography>
                    <Typography variant="body2" className="cabin-card-text">
                      <strong>Ubicación:</strong> {cabin.ubicacion}
                    </Typography>
                    <Typography variant="body2" className="cabin-card-text">
                      {cabin.descripcion}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Cabañas;
