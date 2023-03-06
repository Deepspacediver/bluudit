import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

export const checkUsernameAvailable = async (username: string) => {
  try {
    const docRef = doc(firestoreDB, "users", username);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) return false;
    else return username;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error.code);
      return error.code;
    }
  }
};
