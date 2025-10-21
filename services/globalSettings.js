import React,{ createContext, useState, useContext } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
//wraps my screen components within the settings provider providing context to screens
  const [settings, setSettings] = useState({
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
    soundPreference: 0,
    visionCondition: "",
    overallColourScheme: "",
    colourBlindEffect: false,
  });
  // this creates a global state for each setting
  const changeSetting = (setting, value) => {
/*
 this function would allow me to individually call and change a state within the settings 
context without interfering with other states during run time. 
*/
    setSettings(prev => ({...prev, [setting]: value}))
// this handles the change of state of the setting being called
  };

  return(
    <SettingsContext.Provider value={{ settings, changeSetting }}>
        {children}
{/*Ensures children components can be rendered when wrapped by the provider*/}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
// creates a hook for interacting with the objects within the provider