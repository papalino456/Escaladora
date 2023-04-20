import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADrScAFXM-Y4vZnp_EdvOl0HHx9PvckPw",
  authDomain: "escaladora-7a02c.firebaseapp.com",
  projectId: "escaladora-7a02c",
  storageBucket: "escaladora-7a02c.appspot.com",
  messagingSenderId: "612086172338",
  appId: "1:612086172338:web:ba4c8d80861d8caba9d7ab",
  measurementId: "G-3PQM2L2Q6B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;