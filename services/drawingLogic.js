import { db, auth } from "../lib/firebaseConfig";
import { 
    addDoc,  
    collection, 
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs, 
} from "firebase/firestore"

export const savePathsToDB = async (paths) => {
/*
 this accepts the arguments that would be used to both link the user to the drawing as well as the 
 properties of the paths to the drawing in the firestore database
*/
    const userId = auth.currentUser.uid;
// this variable would be used to store the current user's user id which would be accessed later
    try {
        await addDoc(collection(db, "users", userId, "Paths"), {
    // creates a document that stores the following in a .json format in the collection
/* 
this would create a sub collection in my db in the users collection that 
would store paths in the appropriate user id
*/
            paths,
            createdAt: serverTimestamp(),
        });
        alert("Paths saved to cloud! ☁️")
    } catch (error) {
        console.error("Error when saving paths: ", error)
    }
        
};

export const loadLastDrawing = async () => {
// this async function would be used to load the last made drawing

    const userId = auth.currentUser.uid; // stores the currently logged in user's userId
    const q = query(collection(db, "users", userId, "Paths"), orderBy("createdAt", "desc"), limit(1));
/*
    this querries the collection, by order of descending order. it is important to order the dates
    in descending order in order to get the most recent date, and with a limit of 1, limits the 
    returned values to the very first record from the querry. This achieves returning the most 
    recent drawing made and it is loaded to the user's canvas.
*/
    const snapShot = await getDocs(q);
// stores the returned value from the querry in the snapShot variable

    if (!snapShot.empty) {
// this checks if the returned value is null, if not, then returns the recent drawing's paths
        return snapShot.docs[0].data().paths
    } else{
        console.log("No drawings yet 🌵");
        alert("No drawings yet 🌵, start drawing! 🎨")
        return [];
    }
};