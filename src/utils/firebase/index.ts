import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Inicializar la aplicación Firebase solo si no está ya inicializada
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApps()[0]; // Recupera la instancia existente si ya está creada
}

// Obtener una referencia al servicio de almacenamiento
export const storage = getStorage(firebaseApp);
