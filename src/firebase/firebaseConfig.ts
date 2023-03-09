import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC4k4BYAhwL_-wszua9sNL6sobGs8LAH0",
  authDomain: "bluudit-fe53b.firebaseapp.com",
  databaseURL:
    "https://bluudit-fe53b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bluudit-fe53b",
  storageBucket: "bluudit-fe53b.appspot.com",
  messagingSenderId: "819081934280",
  appId: "1:819081934280:web:9f7be4645d48c648b73cfd",
  measurementId: "G-0FHR8ZWD35",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics();

export const auth = getAuth(app);
// getFirestore throws error for emulator
//https://github.com/firebase/firebase-js-sdk/issues/6993
export const firestoreDB = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestoreDB, "localhost", 8080);
}

// createUserWithEmailAndPassword(auth, "test@huh.pl", "123");

export { app };
