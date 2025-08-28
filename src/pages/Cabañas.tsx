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
    '/images/imgcolor/cabaña1.jpg',
    '/images/imgcolor/cabaña2.jpg',
    '/images/imgcolor/cabaña3.jpg',
    '/images/imgcolor/cabaña4.jpg',
    '/images/imgcolor/cabaña5.jpg',
    '/images/imgcolor/cabaña6.jpg',
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
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 0,
        padding: '1rem',

        //backgroundColor: 'transparent', // fuerza transparencia
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontFamily: '"Cinzel", serif',
          fontWeight: 'bold',
          color: '#ffffffff',
        }}
      >
        Nuestras Cabañas
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mt: 5,
          mb: 3,
          fontFamily: '"Cinzel", serif',
          fontWeight: 'bold',
          color: '#fbf6eaff',
        }}
      >
        Comodidades
      </Typography>

      {/* Sección de Comodidades */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 7,
          mt: 2,
          color: '#fbf6eaff',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
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
              variants={{
                hidden: {
                  opacity: 0,
                  y: Math.random() * 100 - 50,
                  x: Math.random() * 100 - 50,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                {item.icon}
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          width="100%"
          sx={{
            background:
              'linear-gradient(135deg,rgb(238, 244, 131),rgb(246, 229, 185)) !important',
            backgroundColor: 'transparent !important',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cabins.map((cabin, index) => (
            <Grid item xs={12} sm={6} md={4} key={cabin.id}>
              <motion.div
                whileHover={{ scale: 1.05 }} // Efecto de elevación al pasar el mouse
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#eddcccff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(6px)', // Efecto elegante

                    textAlign: 'center',
                    paddingBottom: '10px',
                    height: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={imagenes[index] || '/images/default.jpg'}
                    alt={cabin.nombre}
                    sx={{
                      borderTopLeftRadius: '20px', // Bordes redondeados en la imagen
                      borderTopRightRadius: '20px',
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 'bold',
                        textAlign: 'center', // Centra el título
                      }}
                    >
                      {cabin.nombre}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Capacidad:</strong> {cabin.capacidad} personas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Ubicación:</strong> {cabin.ubicacion}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333333' }}>
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
