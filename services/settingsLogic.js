import { auth, db } from '../lib/firebaseConfig';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs, } from "firebase/firestore";

export const saveSettingsToDB = async (userSettings) => {
  const userId = auth.currentUser.uid;
 // this retrieves the corresponding user id of the currently logged in user.
  try {
    await addDoc(collection(db, "users", userId, "userSettings"),{
/* this creates a new field in firestore database called userSettings and would be 
   responsible for storing the user's saved settigs in json format 
*/
      ...userSettings,
      createdAt: serverTimestamp(),
    });
    alert("Settings successfully saved ☁️!")
    console.log("Settings saved to db: ", userSettings)
  } catch (error) {
    alert("Settings couldn't be saved!, check your internet connection and try again ☹️")
    console.error("Error encountered when saving settings: ", error)
  };
};

export const loadUserSettings = async () => {
  const userId = auth.currentUser.uid;
  const q = query(// this querries the db for the user's most recent saved settings
    collection(db, "users", userId, "userSettings"), orderBy("createdAt", "desc"), limit(1)
  ); // the limit of 1 ensures that only the last most recent saved settigns is retrieved from the db
  const snapShot = await getDocs(q);
// this stores the value returned when the database is querried.
  if (!snapShot.empty) {// checks if there are no current saved user settings when querried.
    return snapShot.docs[0].data(); // returns the first item in the array of returned values
  } else{
    console.log("No saved settings found 🌵");
  }
}