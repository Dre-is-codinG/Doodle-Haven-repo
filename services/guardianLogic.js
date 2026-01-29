import { db, auth } from "../lib/firebaseConfig";
import { doc, getDoc, getDocs, query, orderBy, limit, addDoc, collection, onSnapshot, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { hashPasscode } from "./hashLogic";

export const createGuardianProfile = async (guardianEmail, guardianName) => {
    if (!auth.currentUser) return false; //this ensures that if no logged in user, function is returns false
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
        return true;// returns true if the profile had been created.
    } catch (error) {
        console.error("Error when saving guardian profile: ", error)// logs any errors encountered
        return false;
    }
};


export const getGuardianDetails = async () => {
    if (!auth.currentUser) return false; //this ensures that if no logged in user, function is returns false
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
    if (!auth.currentUser) return false; //this ensures that if no logged in user, function is returns false
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

export const verifyGuardianPasscode = async (passcode) => {
    if (!auth.currentUser) return false; //this ensures that if no logged in user, function is returns false
// this function would be responsible for verifying the inputted guardian passcode.
    try{
        const childId = auth.currentUser.uid;// recieves the userID of the currently logged in child.
        const guardianRef = doc(db, "users", childId, "Guardian", "Profile");// references guardian profile field in db
        const guardianSnap = await getDoc(guardianRef);
    // function returns the value of the document within the referenced field in the database.
        if (!guardianSnap.exists()) return false;// if the file does not exist, it returns a false value.
        const storedPasscodeHash = guardianSnap.data().hashedPasscode;
    // stores the hashedPasscode variable from the snap returned by the guardianSnap function
        const inputedHash = await hashPasscode(passcode);
    // hashes the inputed function in the field, this would be used to compare the stored hash.
    /** 
     * the SHA-256 encryption function is a one way function, the returned value of this hash function cannot be 
     * turned back into plain text, because of this, in order to appropriately verify if the parent has entered
     * the correct hash, the most efficient way is by directly comparing hashed values run through the same
     * hash function.
    */
        return inputedHash === storedPasscodeHash;
    // returns a true value if both values are identical.
    } catch (error) {
        console.error("Error encountered during verification: ", error);
        return false;
    }
    
}

export const setGuardianPasscode = async (passcode) => {
    if (!auth.currentUser) return false; //this ensures that if no logged in user, function is returns false
    const childId = auth.currentUser.uid; // retrieves the currently logged in child's userID
    if (!childId) {
        throw new Error("No user is currently logged in.")// throws error if no user is logged in
    }
    const guardianRef = doc(db, "users", childId, "Guardian", "Profile");// references the Guardian sub collection

    try {
        await updateDoc(guardianRef, { hashedPasscode: passcode });
// updates the passcode field in the guardian profile sub collection with the provided passcode
        return { success: true };// returns true if passcode was created and updated successfully.
    } catch (error) {
        console.error("Error saving passcode: ", error);
        return { error: error.message };
    }
    
}

export const guardianExists = async () => {
    const userProfile = auth.currentUser.uid;
    if (!userProfile) {
        return false; // if no user is logged in it would return false everytime, avoiding errors
    }
  const childId = auth.currentUser.uid;// retreives the currently logged in child's userID
  const guardianRef = doc(db, "users", childId, "Guardian", "Profile");// references the Guardian sub collection
  const guardianSnap = await getDoc(guardianRef);// retrieves the document from database

  return guardianSnap.exists();// returns true if a guardian profile exists, and false if not.
};

export const childReportDataSave = async (record) => {
    const childId = auth.currentUser.uid;// defines the userID of the currently logged in user
    await addDoc(collection(db, "users", childId, "user_Report"), record);// stores the drawing data in the user report
}


export const fetchChildReport = async () => {
    const childId = auth.currentUser.uid;// fetches userID of the currently logged in user
    const qry = query(collection(db, "users", childId, "user_Report"), orderBy("time", "asc"));
// this querries the database, in an attempt to fetch all the data from user report form the most recent

    const reportSnapshot = await getDocs(qry);// retrieves the querried data and stores in the variable snapshot
    return reportSnapshot.docs.map(doc => ({
        ...doc.data(),// deconstructs the data within the report snapshot retrieved form db
        time: doc.data().time?.toDate()// converts the saved time to numerical values
    }));
}