import database from "./database";

export const userPreferenceTable = async () => {// creates an instance of the user preference table
    await database.transaction(// creates a table and stores each field with its corresponding data type
            `CREATE TABLE IF NOT EXISTS userPreferences (
                id INTEGER PRIMARY KEY NOT NULL,
                FirstName TEXT NOT NULL,
                LastName TEXT NOT NULL,
                DateOfBirth TEXT NOT NULL,
                favouriteColour TEXT NOT NULL,
                lightContrast TEXT,
                disableFlashingLights INTEGER,
                backgroundWhiteNoise INTEGER,
                lightingIntensitySensitivity TEXT,
                animationStyle TEXT,
                soundPreference TEXT,
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
        pref.backgroundWhiteNoise ? 1 : 0,
        pref.lightingIntensitySensitivity,
        pref.animationStyle,
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


