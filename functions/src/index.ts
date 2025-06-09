import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import * as twilio from 'twilio';

admin.initializeApp();

// 🔹 Obtener credenciales de Twilio desde Firebase Config
const accountSid = functions.config().twilio.account_sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = new twilio.Twilio(accountSid, authToken);
const twilioNumber = 'whatsapp:+14155238886'; // Número de Twilio para WhatsApp

export const enviarNotificacionWhatsApp = functions.https.onRequest(
  async (req, res) => {
    try {
      const db = admin.firestore();
      const reservasSnapshot = await db.collection('reserva').get();

      if (reservasSnapshot.empty) {
        console.log('❌ No se encontraron reservas en Firestore.');
        res.status(200).send('No hay reservas en Firestore.');
        return;
      }

      // ✅ Imprimimos todas las reservas que obtiene Firestore
      const reservas = reservasSnapshot.docs.map((doc) => {
        const data = doc.data() as { id?: string; estado?: string };
        console.log(
          `📌 Reserva obtenida: ${JSON.stringify({ id: doc.id, ...data })}`,
        );
        return { id: doc.id, ...data };
      });

      console.log('📌 Todas las reservas obtenidas:', reservas);

      const reservasPendientes = reservas.filter(
        (reserva) =>
          (reserva.estado || '').toLowerCase().trim() === 'pendiente',
      );

      console.log('⚠️ Reservas pendientes detectadas:', reservasPendientes);

      if (reservasPendientes.length === 0) {
        console.log('❌ No hay reservas pendientes.');
        res.status(200).send('No hay reservas pendientes.');
        return;
      }

      const cantidad = reservasPendientes.length;
      const mensaje = `⚠️ Hay ${cantidad} reservas en estado Pendiente. Revisa el sistema.`;

      try {
        const message = await twilioClient.messages.create({
          body: mensaje,
          from: twilioNumber,
          to: 'whatsapp:+5493541673122',
        });

        console.log('✅ Mensaje de WhatsApp enviado:', message.sid);
        res.status(200).send(`Notificación enviada: ${message.sid}`);
      } catch (error: any) {
        console.error(
          '❌ Error al enviar WhatsApp:',
          error.message,
          error.code,
        );
        res
          .status(500)
          .send(`Error al enviar la notificación: ${error.message}`);
      }

      console.log('✅ Mensaje de WhatsApp enviado.');
      res.status(200).send('Notificación enviada.');
    } catch (error) {
      console.error('❌ Error al enviar WhatsApp:', error);
      res.status(500).send('Error al enviar la notificación.');
    }
  },
);

// 🔹 Función que se ejecuta automáticamente cada 12 horas
export const notificacionesAutomaticas = functions.pubsub
  .schedule('every 12 hours')
  .timeZone('America/Argentina/Buenos_Aires') // Ajusta la zona horaria si es necesario
  .onRun(async () => {
    console.log('⏰ Ejecutando notificación automática cada 12 horas...');
    return enviarNotificacionWhatsApp({} as any, {} as any);
  });
