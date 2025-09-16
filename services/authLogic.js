import { auth } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
// importing necessary functions from firebase auth library to handle authentication

// Function to handle user login
export const logIn = async (email, password) => {// log in function takes in email and password as parameters
  try {// this attempts to log the user in with the email and password provided, checking if both values exist
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error("Login error: ", error);
    return { error: error.message };// throws an error message if the login fails
  }
};

// Function to handle user signup
export const signUp = async (email, password, username) => {
  try {// attempts to create a new user, using the email and password, checking if both values already exist
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {// await ensures doc is created before continuing
      email,// accepts email and username as arguments and stores in database alongside the date created.
      username,
      createdAt: new Date()
    });
    return { user: userCredential.user };
  } catch (error) {
    console.error("Signup error: ", error.code, error.message);
    return { error: error.message, code: error.code };// throws an error message if the signup fails
  }
}; 


// Function to handle password reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { message: 'Password reset email sent' };
  } catch (error) {
    console.error("Password reset error: ", error);
    return { error: error.message };
    }
};

