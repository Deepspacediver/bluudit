import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

const checkIfEmailUnused = async (email: string) => {
  try {
    const emailResponse = await fetchSignInMethodsForEmail(auth, email);
    if (emailResponse.length === 0) return email;
    return "used";
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      return error.code;
    }
  }
};

const createNewUser = async (email: string, password: string) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
    return newUser;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
    }
  }
};

export { checkIfEmailUnused, createNewUser };
