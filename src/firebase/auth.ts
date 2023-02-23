import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

const checkIfEmailUnused = async (email: string) => {
  console.log(email)
  try {
    const isInUse = await fetchSignInMethodsForEmail(auth, email);
    if (isInUse) return email;
    return false;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
    }
  }
};

const createNewUser = async (email: string, password: string) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
    }
  }
};

export { checkIfEmailUnused, createNewUser };
