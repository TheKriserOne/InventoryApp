
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";

const app = firebase.initializeApp(console.log(import.meta.env));
export const auth = app.auth();
export default app
