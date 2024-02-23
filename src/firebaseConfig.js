import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGKErbatYeOKK6h5dtm80A9e2IHZPxcMQ",
  authDomain: "todolistapp-1e93a.firebaseapp.com",
  projectId: "todolistapp-1e93a",
  storageBucket: "todolistapp-1e93a.appspot.com",
  messagingSenderId: "822346324324",
  appId: "1:822346324324:web:de6b7b24823b4fe2794271"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
