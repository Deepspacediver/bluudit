import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpz5iJ8niqIR4Is-xM1KANOfiQ5CML2-E",
  authDomain: "bluudit.firebaseapp.com",
  projectId: "bluudit",
  storageBucket: "bluudit.appspot.com",
  messagingSenderId: "948896431661",
  appId: "1:948896431661:web:adf46abc79b6b1adc202a4",
  measurementId: "G-QE4ZMVTGTD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
