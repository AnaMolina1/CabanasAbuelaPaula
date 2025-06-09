import { useEffect, useState } from 'react';
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Cabañas
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabanas.map((cabana) => (
              <TableRow key={cabana.id}>
                <TableCell>{cabana.nombre}</TableCell>
                <TableCell>{cabana.capacidad}</TableCell>
                <TableCell>{cabana.ubicacion}</TableCell>
                <TableCell>{cabana.descripcion}</TableCell>
                <TableCell>
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
