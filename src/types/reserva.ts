// 📌 src/types/Reserva.ts
import { Timestamp } from 'firebase/firestore';

export interface Reserva {
  id: string;
  cabanaId: string;
  clienteId: string;
  fechaEntrada: Timestamp;
  fechaSalida: Timestamp;
  estado: string;
  observaciones: string;
  cantidadPersonas?: number;
  cantidadDias?: number;
}
