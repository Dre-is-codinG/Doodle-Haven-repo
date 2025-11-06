import React,{ createContext, useState, useContext, useEffect } from "react";
import { saveSettingsToDB, loadUserSettings } from './settingsLogic';
import { auth } from '../lib/firebaseConfig';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
//wraps my screen components within the settings provider providing context to screens
  const defaultUserSettings = {
//  Global state for each setting, providing default values for each state.
    FirstName: "",
    LastName: "",
    dob: "",
    favouriteColour: "",
    lightContrast: 0,
    disableFlashingLights: false,
    backgroundWhiteNoise: 0,
    lightingIntensitySensitivity: 0,
    animationStyle: "",
    soundPreference: 0.4,
    visionCondition: "",
    overallColourScheme: "",
    colourBlindEffect: false,
  };

  const [settings, setSettings] = useState(defaultUserSettings);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
// this listens for when the user logs in or logs out
      if (user) {// this checks if the user is currently logged in
        try {
          const savedSettings = await loadUserSettings();
// this holds the settings retrieved from firestore db
          if (savedSettings) {
/*
 this checks if there have previously been any settings saved to the currently logged in 
 user's account. If so, it sets the global settings state to the loaded settigns from the db, and 
 if not, retains the defined default settings.
*/
            setSettings(savedSettings);
            console.log("Settings successfully loaded: ", savedSettings);
          } else {
            console.log("No settings found");
            setSettings(defaultUserSettings);
          }
        } catch (error) {
          console.error("Error encountered while loading settings:", error);
          setSettings(defaultUserSettings);// if an error occurs, it sets the global state to default
        }
      } else {
        setSettings(defaultUserSettings);
      }
      setisLoading(false);
    });

    return unsubscribe;
  }, []);// ensures this function only calls onec the user's auth state changes

  // this creates a global state for each setting
  const changeSetting = (setting, value) => {
/*
 this function would allow me to individually call and change a state within the settings 
context without interfering with other states during run time. 
*/
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const manualSave = async () => {
// this function would be called when needing to manually save the state of the settings
    await saveSettingsToDB(settings);
  }

  return(
    <SettingsContext.Provider value={{ settings, changeSetting, manualSave, isloading }}>
        {children}
{/*Ensures children components can be rendered when wrapped by the provider*/}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
// creates a hook for interacting with the objects within the provider
