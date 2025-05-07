
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";

const app = firebase.initializeApp(console.log(import.meta.env.VITE_FIREBASE_API_KEY));
export const auth = app.auth();
export default app
