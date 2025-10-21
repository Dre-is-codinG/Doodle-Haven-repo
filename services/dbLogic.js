import database from './database';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const userPreferenceTable = async () => {// creates an instance of the user preference table
    await database.transaction(// creates a table and stores each field with its corresponding data type
            `CREATE TABLE IF NOT EXISTS userPreferences (
                id INTEGER PRIMARY KEY NOT NULL,
                FirstName TEXT NOT NULL,
                LastName TEXT NOT NULL,
                DateOfBirth TEXT NOT NULL,
                favouriteColour TEXT NOT NULL,
                lightContrast INTEGER,
                disableFlashingLights INTEGER,
                backgroundWhiteNoise INTEGER,
                lightingIntensitySensitivity INTEGER,
                animationStyle TEXT,
                soundPreference INTEGER,
                visionCondition INTEGER,
                overallColourScheme TEXT,
                colourBlindEffect INTEGER
            );`
          );
}

export const saveUserPreferences = async (pref) => {
// this function would be used to save user preferences when they are done filling out the form
  await (await database).execAsync('DELETE FROM userPreferences;');
// resets the state of the previous user preference table and rewrites it
  await (await database).runAsync(// passes 17 values that would be stored when a user fills the form
      `INSERT INTO userPreferences (
        FirstName, LastName, DateOfBirth, favouriteColour,
        lightContrast, disableFlashingLights, backgroundWhiteNoise,
        lightingIntensitySensitivity, animationStyle, soundPreference, visionCondition,
        overallColourScheme, colourBlindEffect
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        pref.FirstName,
        pref.LastName,
        pref.DateOfBirth,
        pref.favouriteColour,
        pref.lightContrast,
        pref.disableFlashingLights ? 1 : 0,
        pref.backgroundWhiteNoise,
        pref.lightingIntensitySensitivity,
        pref.animationStyle ? 1 : 0,
        pref.soundPreference,
        pref.visionCondition ? 1 : 0,
        pref.overallColourScheme,
        pref.colourBlindEffect ? 1 : 0
      ]
    );
  };


export const loadUserPreferences = async () => {
// this function would handle loading the database when called. it would pass a callback 
  const rows = await (await database).getAllAsync(
    'SELECT * FROM  userPreferences LIMIT 1;'// getting only the first row when the db is querried
  );
  if ( rows.length > 0) {// checks the lenght of the rows and if the rows are empty, it returns a null value
    return rows[0];// returns the first value after a querry of the db
  } else {
    return null;
  };
};


export const exportDatabase = async () => {
  try {
    const dbUri = `${FileSystem.documentDirectory}SQLite/Doodle-Haven.db`;
// this variable holds the URI of the document directory
    const fileInfo = await FileSystem.getInfoAsync(dbUri);
    if (!fileInfo.exists) {// checks if the .db file exists, if not, returns a messaege
      console.log("Database file does not exist yet");
      return;
    };

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      console.log("Database path:", dbUri);
      await Sharing.shareAsync(dbUri);
      console.log("Database exported successfully!");
    } else {
      console.log("Sharing not available on this platform");
    };
  } catch (error) {
    console.log("Error exporting database: ", error);
  }
};

export const dumpDatabaseContent = async () => {
  try {
    const rows = await (await database).getAllAsync(
      'SELECT * FROM userPreferences;'
    );
    console.log("--- DATABASE CONTENT ---");
    if (rows.length == 0) {
      console.log("Table is empty!");
    } else {
      console.log(rows);
      console.log("----- END -----");
      return rows;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}