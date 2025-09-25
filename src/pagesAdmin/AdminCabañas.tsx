import { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Cabana {
  id: string;
  nombre: string;
  capacidad: number;
  ubicacion: string;
  descripcion: string;
}

const AdminCabanas = () => {
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCabana, setSelectedCabana] = useState<Cabana | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    const fetchCabanas = async () => {
      const querySnapshot = await getDocs(collection(db, 'cabanas'));
      const cabanasList: Cabana[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Cabana, 'id'>; // Asegurarse de excluir `id` si existiera
        return { ...data, id: doc.id };
      });
      setCabanas(cabanasList);
    };
    fetchCabanas();
  }, []);

  const handleEditCabana = (cabana: Cabana) => {
    setSelectedCabana(cabana);
    setNombre(cabana.nombre);
    setCapacidad(cabana.capacidad.toString());
    setUbicacion(cabana.ubicacion);
    setDescripcion(cabana.descripcion);
    setEditOpen(true);
  };

  const handleUpdateCabana = async () => {
    if (selectedCabana) {
      const cabanaRef = doc(db, 'cabanas', selectedCabana.id);
      await updateDoc(cabanaRef, {
        nombre,
        capacidad: parseInt(capacidad),
        ubicacion,
        descripcion,
      });
      setCabanas(
        cabanas.map((cabana) =>
          cabana.id === selectedCabana.id
            ? {
                ...cabana,
                nombre,
                capacidad: parseInt(capacidad),
                ubicacion,
                descripcion,
              }
            : cabana,
        ),
      );
      setEditOpen(false);
      setSelectedCabana(null);
    }
  };

  const handleDeleteCabana = async (id: string) => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar esta cabaña?',
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, 'cabanas', id));
      setCabanas(cabanas.filter((cabana) => cabana.id !== id));
    }
  };

  const handleAddCabana = async () => {
    const newCabana: Omit<Cabana, 'id'> = {
      nombre,
      capacidad: parseInt(capacidad),
      ubicacion,
      descripcion,
    };
    const docRef = await addDoc(collection(db, 'cabanas'), newCabana);
    setCabanas([...cabanas, { ...newCabana, id: docRef.id }]);
    setAddOpen(false);
    setNombre('');
    setCapacidad('');
    setUbicacion('');
    setDescripcion('');
  };

  // (opcional) Diagnóstico: ver anchos reales
  useEffect(() => {
    const c = containerRef.current;
    const t = tableRef.current;
    if (c && t) {
      console.log(
        'Container width:',
        c.clientWidth,
        'Table width:',
        t.scrollWidth,
      );
    }
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif', // podés usar la que prefieras
          textDecoration: 'underline',
          color: '#4c473aff', // opcional: un marrón para acompañar tu fondo
          whiteSpace: 'normal',
          wordBreak: 'break-word',   // 🔹 fuerza corte en palabras largas
    overflowWrap: 'break-word', // 🔹 asegura que no se desborde
    lineHeight: 1.2,            // 🔹 para que no quede demasiado espaciado
          fontSize: {
            xs: '2.8rem', // pantallas muy chicas
            sm: '3rem', // tablets
            md: '2.5rem', // escritorio
          },
        }}
      >
        Gestión de Cabañas
      </Typography>

      <TableContainer
        ref={containerRef}
        sx={{
          mt: 2,
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'auto', // activa scroll horizontal
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y', // habilita gesto horizontal
          // Fuerza que la tabla sea más ancha que el contenedor
          '& table': { minWidth: 800 },
        }}
      >
        {/* 2) Si querés el “look” de Paper, envolvemos por fuera */}
        <Paper
          sx={{ display: 'inline-block' /* se ajusta al ancho de la tabla */ }}
        >
          <Table ref={tableRef} sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#3a422cff' }}>
                {[
                  'Nombre',
                  'Capacidad',
                  'Ubicación',
                  'Descripción',
                  'Acciones',
                ].map((titulo) => (
                  <TableCell
                    key={titulo}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: '#ffffff', // Texto blanco
                      border: '1px solid #ddd',
                      ...(titulo === 'Acciones' && {
        minWidth: 120,       // 👈 ancho mínimo
        width: 140,          // 👈 ancho fijo opcional
        textAlign: 'center', // 👈 centra el contenido
      }),
                    }}
                  >
                    {titulo}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cabanas.map((cabana) => (
                <TableRow
                  key={cabana.id}
                  sx={{
                    backgroundColor: '#fffaf2',
                    '&:hover': {
                      backgroundColor: '#f0e6d6',
                    },
                  }}
                >
                  <TableCell sx={{ border: '1px solid #eee' }}>
                    {cabana.nombre}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #eee' }}>
                    {cabana.capacidad}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #eee' }}>
                    {cabana.ubicacion}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #eee' }}>
                    {cabana.descripcion}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #eee',
    minWidth: 120,       // 👈 mismo ancho mínimo
    width: 140,          // 👈 mismo ancho fijo
    textAlign: 'center', // 👈 centra los iconos
     }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditCabana(cabana)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteCabana(cabana.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddOpen(true)}
        style={{ marginTop: 20 }}
      >
        Agregar Cabaña
      </Button>

      {/* Modal para agregar cabaña */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>Agregar Nueva Cabaña</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddCabana} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para editar cabaña */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Cabaña</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateCabana}
            variant="contained"
            color="primary"
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCabanas;
