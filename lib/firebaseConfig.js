import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// these objects would allow me to store user details such as username and other details in a firestore database
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
/*
 the getReactNativePersistence is an object from the firebase auth library used to set up persistence for 
 authentication in the application. By using this, it ensures that the user's authentication state is maintained 
 across app restarts and sessions, allowing the user to access their account without continuously needing to log in.
*/
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIRZwyUoYJTIt2OxU0gUyCr8sdyXcrjEw",
  authDomain: "doodle-haven.firebaseapp.com",
  projectId: "doodle-haven",
  storageBucket: "doodle-haven.firebasestorage.app",
  messagingSenderId: "801316453682",
  appId: "1:801316453682:web:715dde59687c7891f4eb2b",
  measurementId: "G-4RJQBPV184"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const auth = initializeAuth(app,  {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// this allows for persistence of the authentication state that would be used in the react native async storage
// });
export const db = getFirestore(app);
// creates a firestore database instance that would be used to store user details

// export the auth variable to be used in other files to handle authentication
const analytics = getAnalytics(app);