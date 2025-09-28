import database from "./database";

export const userPreferenceTable = () => {// creates an instance of the user preference table
    database.transaction(tx => {// creates a table and stores each field with its corresponding data type
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS userPreferences (
                id INTEGER PRIMARY KEY NOT NULL,
                FirstName TEXT NOT NULL,
                LastName TEXT NOT NULL,
                DateOfBirth TEXT NOT NULL,
                favouriteColour TEXT NOT NULL,
                themePreference TEXT,
                lightContrast TEXT,
                disableFlashingLights INTEGER,
                backgroundWhiteNoise INTEGER,
                lightingIntensitySensitivity TEXT,
                animationStyle TEXT,
                soundPreference TEXT,
                visionCondition TEXT,
                overallColourScheme TEXT,
                colourRecommendation TEXT,
                dominantColour TEXT,
                colourBlindEffect INTEGER
            );`
        );
    });
}

export const saveUserPreferences = (pref) => {
// this function would be used to save user preferences when they are done filling out the form
  database.transaction(tx => {
    tx.executeSql('DELETE FROM userPreferences;');
// resets the state of the previous user preference table and rewrites it
    tx.executeSql(// passes 17 values that would be stored when a user fills the form
      `INSERT INTO userPreferences (
        FirstName, LastName, DateOfBirth, favouriteColour,
        themePreference, lightContrast, disableFlashingLights, backgroundWhiteNoise,
        lightingIntensitySensitivity, animationStyle, soundPreference, visionCondition,
        overallColourScheme, colourRecommendation, dominantColour,
        colourBlindEffect
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        pref.FirstName,
        pref.LastName,
        pref.DateOfBirth,
        pref.favouriteColour,
        pref.themePreference,
        pref.lightContrast,
        pref.disableFlashingLights ? 1 : 0,
        pref.backgroundWhiteNoise ? 1 : 0,
        pref.lightingIntensitySensitivity,
        pref.animationStyle,
        pref.soundPreference,
        pref.visionCondition,
        pref.overallColourScheme,
        pref.colourRecommendation,
        pref.dominantColour,
        pref.colourBlindEffect ? 1 : 0
      ]
    );
  });
};

export const loadUserPreferences = (callback) => {// this function would handle loading the database when called. it would pass a callback 
  database.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM userPreferences LIMIT 1;',
      [],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(rows._array[0]);
        } else {
          callback(null);
        }
      }
    );
  });
};