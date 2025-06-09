// src/firebase/auth.ts

import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

// Inicializa el servicio de autenticación con la app configurada
const auth = getAuth(app);

export default auth;
