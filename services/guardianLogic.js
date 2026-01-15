import { db, auth } from "../lib/firebaseConfig";
import { doc, getDoc, getDocs, query, orderBy, limit, addDoc, collection, onSnapshot, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const createGuardianProfile = async (guardianEmail, guardianName) => {
// accepts the guardian's email and name as arguments when called
const childId = auth.currentUser.uid;// gets the current logged in child's user id from database
const guardianRef = doc(db, "users", childId, "Guardian", "Profile");
    try {
        await setDoc(guardianRef,{
// creates a sub collection within the user document of the currently logged in child user
            guardianEmail,
            guardianName,
            createdAt: serverTimestamp()
// adds the gaurdian's email and guardian name to the sub collection.
        }, { merge: true })// prevents overwriting existing data in the database
        return { success: true };// returns success true if the profile had been created.
    } catch (error) {
        console.error("Error when saving guardian profile: ", error)// logs any errors encountered
        return { error: error.message };
    }
};


export const getGuardianDetails = async () => {
    const childId = auth.currentUser.uid; // retrieves the currently logged in child's userID
    const guardianRef = doc(db, "users", childId, "Guardian", "Profile");
    const guardianSnap = await getDoc(guardianRef); // retrieves the document from the database

    if(guardianSnap.exists()) {
        return guardianSnap.data().guardianName; // returns the guardian's name from the document
    } else{
        console.log("No guardians assigned to this profile")
        return null;// if no guardians are assigned to the profile, returns null
    }

};

export const getChildAccountDetails = async () => {
    const childId = auth.currentUser.uid; // retrieves the currently logged in child's userID
    const docRef = doc(db, "users", childId); // references the specific child user 
    const docSnap = await getDoc(docRef); // retrieves the document from the database
    if (docSnap.exists()) {
        return docSnap.data().username; // returns the username of the child account
    } else {
        console.log("Document does not exist");
        return null; // if no child exists, returns null
    }

};

export const setGuardianPasscode = async (passcode) => {
    const childId = auth.currentUser.uid; // retrieves the currently logged in child's userID
    if (!childId) {
        throw new Error("No user is currently logged in.")// throws error if no user is logged in
    }
    const guardianRef = doc(db, "users", childId, "Guardian", "Profile");// references the Guardian sub collection

    try {
        await updateDoc(guardianRef, { passcode: passcode });
// updates the passcode field in the guardian profile sub collection with the provided passcode
        return { success: true };// returns true if passcode was created and updated successfully.
    } catch (error) {
        console.error("Error saving passcode: ", error);
        return { error: error.message };
    }
    
}

export const guardianExists = async () => {
    const userProfile = auth.currentUser;
    if (!userProfile) {
        return false; // if no user is logged in it would return false everytime, avoiding errors
    }
  const childId = auth.currentUser.uid;// retreives the currently logged in child's userID
  const guardianRef = doc(db, "users", childId, "Guardian", "Profile");// references the Guardian sub collection
  const guardianSnap = await getDoc(guardianRef);// retrieves the document from database

  return guardianSnap.exists();// returns true if a guardian profile exists, and false if not.
};
