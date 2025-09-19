import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  InputAdornment,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/TablaResponsive.css';

interface Cliente {
  id?: string;
  nombre: string;
  mail: string;
  dni: string;
  telefono: number;
}

const AdminClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [clienteActual, setClienteActual] = useState<Cliente>({
    nombre: '',
    mail: '',
    dni: '',
    telefono: 0,
  });
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState(''); // 🔎 Estado de búsqueda
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null);


  // Obtener clientes de Firebase
  useEffect(() => {
    const fetchClientes = async () => {
      const clientesCollection = collection(db, 'cliente');
      const clientesSnapshot = await getDocs(clientesCollection);
      const clientesList = clientesSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Cliente,
      );
      setClientes(clientesList);
    };
    fetchClientes();
  }, []);

  // Manejo de apertura y cierre del formulario
  const handleOpen = (cliente?: Cliente) => {
    if (cliente) setClienteActual(cliente);
    else setClienteActual({ nombre: '', mail: '', dni: '', telefono: 0 });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Manejo de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClienteActual({ ...clienteActual, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar cliente en Firebase
  const handleSave = async () => {
    if (!clienteActual.mail.includes("@")) {
    alert("El email debe contener @");
    return;
  }
    const clienteData = {
      nombre: clienteActual.nombre,
      mail: clienteActual.mail,
      dni: clienteActual.dni,
      telefono: clienteActual.telefono,
    };

    if (clienteActual.id) {
      // Editar cliente existente
      const clienteRef = doc(db, 'cliente', clienteActual.id);
      await updateDoc(clienteRef, clienteData);
      // Actualizar el estado sin recargar
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === clienteActual.id
            ? { ...cliente, ...clienteData }
            : cliente,
        ),
      );
    } else {
      // Agregar nuevo cliente
      const clientesCollection = collection(db, 'cliente');
      const newDocRef = await addDoc(clientesCollection, clienteData);

      // Actualizar el estado sin recargar
      setClientes((prevClientes) => [
        ...prevClientes,
        { id: newDocRef.id, ...clienteData },
      ]);
    }

    handleClose();
  };

 
  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const confirmarEliminar = async () => {
  if (clienteAEliminar?.id) {
    const clienteRef = doc(db, 'cliente', clienteAEliminar.id);
    await deleteDoc(clienteRef);
    setClientes((prevClientes) =>
      prevClientes.filter((c) => c.id !== clienteAEliminar.id),
    );
  }
  setDeleteOpen(false);
  setClienteAEliminar(null);
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

    // 🔎 Filtrar clientes según búsqueda
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toString().includes(searchTerm)
  );

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
          color: '#ffede9ff', // opcional: un marrón para acompañar tu fondo
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
        Gestión de Clientes
      </Typography>


      <Box
  sx={{
    mt: 2,
    mb: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // ✅ para que en pantallas chicas se apilen
    gap: 2,
  }}
>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        + AGREGAR CLIENTE
      </Button>

        {/* 🔎 Campo de búsqueda */}
      <TextField
        placeholder="Buscar por nombre o teléfono"
        variant="outlined"
        size="small"
        sx={{ mt: 2, mb: 2, width: '100%', maxWidth: 400 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </Box>

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
            {/* ...TableHead / TableBody igual que ya tenés */}
            <TableHead>
              <TableRow sx={{ backgroundColor: '#47b0cdff' }}>
                <TableCell
                  onClick={handleSort}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                    color: '#ffffff',
                  }}
                >
                  Nombre {order === 'asc' ? '▲' : '▼'}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    color: '#ffffff',
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    color: '#ffffff',
                  }}
                >
                  Teléfono
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    color: '#ffffff',
                  }}
                >
                  DNI
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    color: '#ffffff',
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes
                .sort((a, b) => {
                  return order === 'asc'
                    ? a.nombre.localeCompare(b.nombre)
                    : b.nombre.localeCompare(a.nombre);
                })
                .map((cliente) => (
                  <TableRow
                    key={cliente.id}
                    sx={{
                      backgroundColor: '#fffaf2',
                      '&:hover': {
                        backgroundColor: '#f0e6d6',
                      },
                    }}
                  >
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {cliente.nombre}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {cliente.mail}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {cliente.telefono}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {cliente.dni}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      <IconButton
                        onClick={() => handleOpen(cliente)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
  onClick={() => {
    setClienteAEliminar(cliente); // guardamos cliente
    setDeleteOpen(true);          // abrimos diálogo
  }}
  color="secondary"
>
  <DeleteIcon />
</IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>

      {/* Dialog para agregar/editar cliente */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {clienteActual.id ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="dense"
            value={clienteActual.nombre}
            onChange={handleChange}
          />
          <TextField
  label="Email"
  name="mail"
  fullWidth
  margin="dense"
  value={clienteActual.mail}
  onChange={handleChange}
  error={!!clienteActual.mail && !clienteActual.mail.includes("@")} // Marca en rojo si no hay @
  helperText={
    !!clienteActual.mail && !clienteActual.mail.includes("@")
      ? "El correo debe contener @"
      : ""
  }
/>

          <TextField
            label="Teléfono"
            name="telefono"
            type="number"
            fullWidth
            margin="dense"
            value={clienteActual.telefono}
            onChange={handleChange}
          />
          <TextField
            label="DNI"
            name="dni"
            fullWidth
            margin="dense"
            value={clienteActual.dni}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog de confirmación de eliminación */}
<Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
  <DialogTitle>Eliminar Cliente</DialogTitle>
  <DialogContent>
    <Typography>
      ¿Estás seguro que deseas eliminar al cliente{" "}
      <strong>{clienteAEliminar?.nombre}</strong>?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteOpen(false)} color="secondary">
      Cancelar
    </Button>
    <Button
      onClick={confirmarEliminar}
      color="error"
      variant="contained"
    >
      Eliminar
    </Button>
  </DialogActions>
</Dialog>
    </Container>
  );
};

export default AdminClientes;
