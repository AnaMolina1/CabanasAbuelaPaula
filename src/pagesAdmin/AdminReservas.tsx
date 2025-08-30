import { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Reserva } from '../types/reserva'; // Importamos la interfaz correctamente

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
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  verificarReservasPendientes,
  iniciarNotificacionesAutomaticas,
} from '../utils/notificaciones';

interface Cabana {
  id: string;
  nombre: string;
}

interface Cliente {
  id: string;
  nombre: string;
}

const AdminReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [cabanaId, setCabanaId] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [estado, setEstado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState(0);
  const [cantidadDias, setCantidadDias] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [clienteSeleccionadoEditar, setClienteSeleccionadoEditar] =
    useState('');
  const [nuevoCliente, setNuevoCliente] = useState('');
  const [filtroCabana, setFiltroCabana] = useState<string>('todas');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      const querySnapshot = await getDocs(collection(db, 'reserva'));
      const reservasList: Reserva[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Reserva, 'id'>;
        return {
          ...data,
          id: doc.id,
          fechaEntrada: data.fechaEntrada
            ? Timestamp.fromMillis(data.fechaEntrada.seconds * 1000)
            : undefined,
          fechaSalida: data.fechaSalida
            ? Timestamp.fromMillis(data.fechaSalida.seconds * 1000)
            : undefined,
          cantidadPersonas: data.cantidadPersonas || 0,
          cantidadDias: data.cantidadDias || 0,
        };
      });
      setReservas(reservasList);
    };

    const fetchCabanas = async () => {
      const querySnapshot = await getDocs(collection(db, 'cabanas'));
      const cabanasList: Cabana[] = querySnapshot.docs.map((doc) => {
        const cabanaData = doc.data();
        return { id: doc.id, ...cabanaData } as Cabana;
      });
      setCabanas(cabanasList);
    };

    fetchReservas();
    fetchCabanas();
  }, []);

  useEffect(() => {
    iniciarNotificacionesAutomaticas();
  }, []);

  // Obtener clientes de Firebase
  useEffect(() => {
    const fetchClientes = async () => {
      const querySnapshot = await getDocs(collection(db, 'cliente'));
      const clientesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cliente[];
      setClientes(clientesList);
    };
    fetchClientes();
  }, []);

  const handleClienteChange = (e: SelectChangeEvent<string>) => {
    setClienteSeleccionado(e.target.value);
    if (e.target.value === 'nuevo') {
      setNuevoCliente('');
    }
  };

  const convertirFechaUTC = (fecha: string): Timestamp => {
    const date = new Date(fecha);
    date.setUTCHours(12, 0, 0, 0); // Fijar la hora al mediodía UTC para evitar cambios por zona horaria
    return Timestamp.fromDate(date);
  };

  const calcularCantidadDias = (entrada: string, salida: string): number => {
    const fecha1 = new Date(entrada);
    const fecha2 = new Date(salida);
    return Math.max(
      0,
      Math.ceil((fecha2.getTime() - fecha1.getTime()) / (1000 * 60 * 60 * 24)),
    );
  };

  const handleUpdateReserva = async () => {
    if (!selectedReserva) return;

    const dias = calcularCantidadDias(fechaEntrada, fechaSalida);

    try {
      const reservaRef = doc(db, 'reserva', selectedReserva.id);
      await updateDoc(reservaRef, {
        cabanaId,
        clienteId: clienteSeleccionadoEditar,
        fechaEntrada: convertirFechaUTC(fechaEntrada),
        fechaSalida: convertirFechaUTC(fechaSalida),
        estado,
        observaciones,
        cantidadPersonas, // SE AGREGA NUEVO CAMPO
        cantidadDias: dias,
      });

      setReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === selectedReserva.id
            ? {
                ...reserva,
                cabanaId,
                clienteId: clienteSeleccionadoEditar,
                fechaEntrada: convertirFechaUTC(fechaEntrada),
                fechaSalida: convertirFechaUTC(fechaSalida),
                estado,
                observaciones,
                cantidadPersonas,
                cantidadDias: dias, // SE ACTUALIZA AUTOMÁTICAMENTE
              }
            : reserva,
        ),
      );
      verificarReservasPendientes();

      setEditOpen(false);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
    }
  };

  const handleAddReserva = async () => {
    if (!cabanaId || !fechaEntrada || !fechaSalida || !estado) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    let clienteIdFinal = clienteSeleccionado;
    let clienteNombreFinal =
      clientes.find((c) => c.id === clienteSeleccionado)?.nombre ||
      clienteSeleccionado;

    // 🆕 Si el usuario seleccionó "Nuevo Cliente", primero se crea en Firebase
    if (clienteSeleccionado === 'nuevo' && nuevoCliente.trim() !== '') {
      const clienteData = {
        nombre: nuevoCliente,
        mail: '',
        dni: '',
        telefono: 0,
      };
      const newClienteRef = await addDoc(
        collection(db, 'cliente'),
        clienteData,
      );
      clienteIdFinal = newClienteRef.id; // Obtenemos el nuevo ID
      clienteNombreFinal = nuevoCliente; // Guardamos el nombre para actualizar la tabla sin recargar
    }

    const dias = calcularCantidadDias(fechaEntrada, fechaSalida);
    const newReserva: Omit<Reserva, 'id'> = {
      cabanaId,
      clienteId: clienteNombreFinal, // 🔹 Guarda el nombre en vez del ID
      fechaEntrada: convertirFechaUTC(fechaEntrada),
      fechaSalida: convertirFechaUTC(fechaSalida),
      estado,
      observaciones,
      cantidadPersonas,
      cantidadDias: dias,
    };

    try {
      const docRef = await addDoc(collection(db, 'reserva'), newReserva);

      // 🔹 Actualiza la tabla inmediatamente con el nombre del cliente
      setReservas([...reservas, { ...newReserva, id: docRef.id }]);

      // 🔹 Llamamos a la función para verificar reservas pendientes y enviar notificación si es necesario
      verificarReservasPendientes();

      // 🔹 Si se agregó un nuevo cliente, también actualiza la lista de clientes en el estado
      if (clienteSeleccionado === 'nuevo') {
        setClientes([
          ...clientes,
          { id: clienteIdFinal, nombre: nuevoCliente },
        ]);
      }

      // Limpiar el formulario
      setAddOpen(false);
      setCabanaId('');
      setClienteSeleccionado('');
      setNuevoCliente('');
      setFechaEntrada('');
      setFechaSalida('');
      setEstado('');
      setObservaciones('');
      setCantidadPersonas(0);
      setCantidadDias(0);
    } catch (error) {
      console.error('Error al agregar la reserva:', error);
      alert('Hubo un error al agregar la reserva.');
    }
  };

  const handleDeleteReserva = async (id: string) => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar esta reserva?',
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, 'reserva', id));
      setReservas(reservas.filter((reserva) => reserva.id !== id));
    }
  };

  const handleEditReserva = (reserva: Reserva) => {
    setSelectedReserva(reserva);
    setCabanaId(reserva.cabanaId);
    setClienteSeleccionadoEditar(reserva.clienteId);
    setFechaEntrada(
      reserva.fechaEntrada
        ? reserva.fechaEntrada.toDate().toISOString().split('T')[0]
        : '',
    );
    setFechaSalida(
      reserva.fechaSalida
        ? reserva.fechaSalida.toDate().toISOString().split('T')[0]
        : '',
    );
    setEstado(reserva.estado);
    setObservaciones(reserva.observaciones);
    setCantidadPersonas(reserva.cantidadPersonas || 0);
    setCantidadDias(reserva.cantidadDias || 0);
    setEditOpen(true);
  };

  const handleFiltroCabana = (event: SelectChangeEvent<string>) => {
    setFiltroCabana(event.target.value);
  };

  const getEstadoIcono = (estado: string) => {
    if (estado === 'Confirmada') {
      return (
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          ✅ Confirmada
        </span>
      );
    } else {
      return (
        <span style={{ color: 'orange', fontWeight: 'bold' }}>
          ⚠️ Pendiente
        </span>
      );
    }
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
          color: '#ffede9ff', // opcional: un marrón para acompañar tu fondo
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          fontSize: {
            xs: '2.5rem', // pantallas muy chicas
            sm: '3rem', // tablets
            md: '2.5rem', // escritorio
          },
        }}
      >
        Gestión de Reservas
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddOpen(true)}
        >
          + AGREGAR RESERVA
        </Button>
      </Box>
      <Box mt={2}>
        <Select
          value={filtroCabana}
          onChange={handleFiltroCabana}
          displayEmpty
          margin="dense"
          sx={{
            marginTop: 2,
            marginBottom: 2,
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#fdf7f2', // beige suave
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            '& .MuiSelect-select': {
              padding: '10px 14px',
            },
            '& fieldset': {
              border: 'none',
            },
            '&:hover': {
              borderColor: '#888',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#f8eedfff', // fondo del menú desplegable (más claro aún)
              },
            },
          }}
        >
          <MenuItem value="todas">Todas las Reservas</MenuItem>
          {cabanas.map((cabana) => (
            <MenuItem key={cabana.id} value={cabana.id}>
              {cabana.nombre}
            </MenuItem>
          ))}
        </Select>
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
            <TableHead>
              <TableRow sx={{ backgroundColor: '#47b0cdff' }}>
                {[
                  'Cabaña',
                  'Cliente',
                  'Fecha Entrada',
                  'Fecha Salida',
                  'Cantidad Días',
                  'Estado',
                  'Observaciones',
                  'Cantidad Personas',
                  'Acciones',
                ].map((titulo) => (
                  <TableCell
                    key={titulo}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: '#ffffff',
                      border: '1px solid #ddd',
                    }}
                  >
                    {titulo}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {reservas
                .filter(
                  (reserva) =>
                    filtroCabana === 'todas' ||
                    reserva.cabanaId === filtroCabana,
                )
                .map((reserva) => (
                  <TableRow
                    key={reserva.id}
                    sx={{
                      backgroundColor: '#fffaf2',
                      '&:hover': {
                        backgroundColor: '#f0e6d6',
                      },
                    }}
                  >
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {cabanas.find((c) => c.id === reserva.cabanaId)?.nombre ||
                        'Desconocida'}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {clientes.find(
                        (cliente) => cliente.id === reserva.clienteId,
                      )?.nombre || reserva.clienteId}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {reserva.fechaEntrada
                        ? reserva.fechaEntrada
                            .toDate()
                            .toISOString()
                            .split('T')[0]
                        : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {reserva.fechaSalida
                        ? reserva.fechaSalida
                            .toDate()
                            .toISOString()
                            .split('T')[0]
                        : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {reserva.cantidadDias}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {getEstadoIcono(reserva.estado)}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {reserva.observaciones}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      {reserva.cantidadPersonas}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #eee' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditReserva(reserva)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteReserva(reserva.id)}
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

      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>Agregar Nueva Reserva</DialogTitle>
        <DialogContent>
          <Select
            value={cabanaId}
            onChange={(e) => setCabanaId(e.target.value as string)}
            fullWidth
            displayEmpty
            renderValue={
              cabanaId !== '' ? undefined : () => 'Seleccione una Cabaña'
            }
          >
            <MenuItem value="" disabled>
              Seleccione una Cabaña
            </MenuItem>
            {cabanas.map((cabana) => (
              <MenuItem key={cabana.id} value={cabana.id}>
                {cabana.nombre}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={clienteSeleccionado}
            onChange={handleClienteChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione un Cliente
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </MenuItem>
            ))}
            <MenuItem value="nuevo">Nuevo Cliente</MenuItem>
          </Select>

          {clienteSeleccionado === 'nuevo' && (
            <TextField
              label="Nombre del nuevo cliente"
              value={nuevoCliente}
              onChange={(e) => setNuevoCliente(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}

          <TextField
            label="Fecha Entrada"
            type="date"
            value={fechaEntrada}
            onChange={(e) => setFechaEntrada(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha Salida"
            type="date"
            value={fechaSalida}
            onChange={(e) => setFechaSalida(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad de Días"
            type="number"
            value={cantidadDias}
            fullWidth
            margin="normal"
            disabled // NO SE PUEDE EDITAR
          />
          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            fullWidth
            displayEmpty
            renderValue={
              estado !== '' ? undefined : () => 'Seleccione un Estado'
            }
          >
            <MenuItem value="" disabled>
              Seleccione un Estado
            </MenuItem>
            <MenuItem value="Confirmada">✅ Confirmada</MenuItem>
            <MenuItem value="Pendiente">⚠️ Pendiente</MenuItem>
          </Select>

          <TextField
            label="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad de Personas"
            type="number"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleAddReserva}
            variant="contained"
            color="primary"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edición de reserva */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Reserva</DialogTitle>
        <DialogContent>
          <DialogContent>
            <Select
              value={cabanaId}
              onChange={(e) => setCabanaId(e.target.value as string)}
              fullWidth
              displayEmpty
              renderValue={
                cabanaId !== '' ? undefined : () => 'Seleccione una Cabaña'
              }
            >
              <MenuItem value="" disabled>
                Seleccione una Cabaña
              </MenuItem>
              {cabanas.map((cabana) => (
                <MenuItem key={cabana.id} value={cabana.id}>
                  {cabana.nombre}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={clienteSeleccionadoEditar}
              onChange={(e) => setClienteSeleccionadoEditar(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione un Cliente
              </MenuItem>
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </MenuItem>
              ))}
              <MenuItem value="nuevo">Nuevo Cliente</MenuItem>
            </Select>

            <TextField
              label="Fecha Entrada"
              type="date"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha Salida"
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cantidad de Días"
              type="number"
              value={cantidadDias}
              fullWidth
              margin="normal"
              disabled // NO SE PUEDE EDITAR
            />
            <Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              fullWidth
              displayEmpty
              renderValue={
                estado !== '' ? undefined : () => 'Seleccione un Estado'
              }
            >
              <MenuItem value="" disabled>
                Seleccione un Estado
              </MenuItem>
              <MenuItem value="Confirmada">✅ Confirmada</MenuItem>
              <MenuItem value="Pendiente">⚠️ Pendiente</MenuItem>
            </Select>

            <TextField
              label="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cantidad de Personas"
              type="number"
              value={cantidadPersonas}
              onChange={(e) => setCantidadPersonas(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateReserva}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminReservas;
