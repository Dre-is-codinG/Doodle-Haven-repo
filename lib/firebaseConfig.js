import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
/*
 the getReactNativePersistence is an object from the firebase auth library used to set up persistence for 
 authentication in the application. By using this, it ensures that the user's authentication state is maintained 
 across app restarts and sessions, allowing the user to access their account without continuously needing to log in.
*/


const firebaseConfig = {
  apiKey: "AIzaSyCIRZwyUoYJTIt2OxU0gUyCr8sdyXcrjEw",
  authDomain: "doodle-haven.firebaseapp.com",
  projectId: "doodle-haven",
  storageBucket: "doodle-haven.firebasestorage.app",
  messagingSenderId: "801316453682",
  appId: "1:801316453682:web:b06ff141f9816058f4eb2b",
  measurementId: "G-T76NY3J89Y"
};

// Firebase object initializations
const app = initializeApp(firebaseConfig);
// connects my application to my corresponding firebase project with the provided keys.
// export const auth = getAuth(app);// initialize authentication allowing for account creation
export const db = getFirestore(app);// initializes firestore that would be used to store extra data to the database
export const auth = initializeAuth(app,  {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// this allows for persistence of the authentication state that would be used in the react native async storage
});
