// src/utils/notificaciones.ts
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

import emailjs from 'emailjs-com';
import { Reserva } from '../types/reserva';

import { serverTimestamp } from 'firebase/firestore';

// ✅ Configuración de EmailJS
const SERVICE_ID = 'TU_SERVICE_ID';
const TEMPLATE_ID = 'TU_TEMPLATE_ID';
const USER_ID = 'TU_USER_ID';

// ✅ Función para verificar reservas pendientes
export const verificarReservasPendientes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reserva'));
    const reservasList: Reserva[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Reserva), // ✅ Aseguramos el tipado de los datos
      id: doc.id,
    }));

    const reservasPendientes = reservasList.filter(
      (reserva) => reserva.estado === 'Pendiente',
    );

    if (reservasPendientes.length > 0) {
      // ✅ Antes de enviar, verificamos si ya se notificó en Firebase
      const yaNotificado = await verificarSiYaNotificado();

      if (!yaNotificado) {
        await enviarNotificacionWhatsApp(reservasPendientes.length);
        await enviarNotificacionEmail(reservasPendientes.length);

        // ✅ Guardamos la notificación en Firebase
        await registrarNotificacionEnFirebase(reservasPendientes.length);
      }
    }
  } catch (error) {
    console.error('Error al verificar reservas pendientes:', error);
  }
};

// ✅ Función para verificar si ya se notificó en las últimas 12 horas
const verificarSiYaNotificado = async () => {
  const ahora = new Date();
  ahora.setHours(ahora.getHours() - 12); // Buscamos notificaciones de las últimas 12 horas

  const notificacionesRef = collection(db, 'notificaciones');
  const q = query(notificacionesRef, where('timestamp', '>=', ahora));

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retorna true si ya existe una notificación reciente
};

// ✅ Función para registrar la notificación en Firebase
const registrarNotificacionEnFirebase = async (cantidad: number) => {
  try {
    await addDoc(collection(db, 'notificaciones'), {
      mensaje: `⚠️ Se notificó sobre ${cantidad} reservas pendientes.`,
      timestamp: serverTimestamp(), // ✅ Usa Firebase serverTimestamp()
    });
    console.log('Notificación guardada en Firebase.');
  } catch (error) {
    console.error('Error al guardar la notificación en Firebase:', error);
  }
};

// ✅ Función para enviar WhatsApp (Por ahora un placeholder, si usas un backend, haz una solicitud HTTP)
export const enviarNotificacionWhatsApp = async (cantidad: number) => {
  console.log(`📲 WhatsApp: ⚠️ Hay ${cantidad} reservas en estado Pendiente.`);
};

// ✅ Enviar Notificación por Email con EmailJS
export const enviarNotificacionEmail = async (cantidad: number) => {
  const templateParams = {
    to_name: 'Administrador',
    message: `⚠️ Hay ${cantidad} reservas en estado Pendiente. Revisa el sistema.`,
    to_email: 'admin@email.com', // Cambia esto por el correo del administrador
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
    console.log('Email enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar Email:', error);
  }
};

// ✅ Función para programar notificaciones automáticas a las 9 AM y 6 PM
export const iniciarNotificacionesAutomaticas = () => {
  console.log('⏰ Iniciando notificaciones automáticas...');

  const calcularTiempoParaSiguienteNotificacion = () => {
    const ahora = new Date();
    console.log(`📅 Hora actual: ${ahora.toLocaleTimeString()}`);
    const horas = ahora.getHours();
    let siguienteHora;

    if (horas < 9) {
      siguienteHora = new Date(ahora.setHours(9, 0, 0, 0)); // Notificación a las 9 AM
    } else if (horas < 18) {
      siguienteHora = new Date(ahora.setHours(18, 0, 0, 0)); // Notificación a las 6 PM
    } else {
      siguienteHora = new Date(ahora.setHours(9, 0, 0, 0)); // Notificación al día siguiente a las 9 AM
      siguienteHora.setDate(siguienteHora.getDate() + 1);
    }

    console.log(
      `📅 Próxima notificación programada para: ${siguienteHora.toLocaleTimeString()}`,
    );
    return siguienteHora.getTime() - ahora.getTime();
  };

  const tiempoHastaNotificacion = calcularTiempoParaSiguienteNotificacion();

  setTimeout(() => {
    console.log('🔍 Ejecutando `verificarReservasPendientes()`');
    verificarReservasPendientes();
    setInterval(
      () => {
        console.log(
          '🔄 Ejecutando `verificarReservasPendientes()` cada 12 horas',
        );
        verificarReservasPendientes();
      },
      12 * 60 * 60 * 1000,
    );
  }, tiempoHastaNotificacion);
};
