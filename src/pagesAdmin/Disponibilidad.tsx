import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";

interface Cabana {
  id: string;
  nombre: string;
}

interface Reserva {
  id: string;
  fechaEntrada: Date;
  fechaSalida: Date;
}

const Disponibilidad: React.FC = () => {
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [cabanaSeleccionada, setCabanaSeleccionada] = useState<string>("");
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const obtenerCabanas = async () => {
      const cabanasRef = collection(db, "cabanas");
      const querySnapshot = await getDocs(cabanasRef);
      const cabanasData: Cabana[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre || "Sin Nombre"
      }));
      console.log("Cabañas obtenidas:", cabanasData);
      setCabanas(cabanasData);
    };
    obtenerCabanas();
  }, []);

  useEffect(() => {
    const obtenerReservas = async () => {
      if (!cabanaSeleccionada) return;
      
      const reservasRef = collection(db, "reserva");
      const q = query(reservasRef, where("cabanaId", "==", cabanaSeleccionada));
      const querySnapshot = await getDocs(q);
      
      const reservasData: Reserva[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          fechaEntrada: data.fechaEntrada ? data.fechaEntrada.toDate() : new Date(),
          fechaSalida: data.fechaSalida ? data.fechaSalida.toDate() : new Date()
        };
      });
      
      console.log("Reservas obtenidas para", cabanaSeleccionada, ":", reservasData);
      setReservas(reservasData);
    };
    
    obtenerReservas();
  }, [cabanaSeleccionada]);

  const eventos = reservas.map(reserva => {
    console.log("Procesando evento:", reserva);
    return {
      title: "Reservado",
      start: reserva.fechaEntrada.toISOString().split("T")[0],
      end: reserva.fechaSalida.toISOString().split("T")[0],
      color: "red",
      allDay: true,
    };
  });

  console.log("Eventos generados:", eventos);

  return (
    <div>
      <h2 style={{ marginTop: "-45px" }}>Disponibilidad de Cabañas</h2>

      <label>Selecciona una cabaña: </label>
      <select onChange={(e) => setCabanaSeleccionada(e.target.value)} value={cabanaSeleccionada}>
        <option value="">-- Seleccionar --</option>
        {cabanas.map((cabana) => (
          <option key={cabana.id} value={cabana.id}>{cabana.nombre}</option>
        ))}
      </select>
      
      {cabanaSeleccionada && (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
          <FullCalendar 
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            events={eventos} 
            height="auto"
          />
        </div>
      )}
    </div>
  );
};

export default Disponibilidad;
