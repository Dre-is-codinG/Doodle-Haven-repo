import {} from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./screens/WelcomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import HomeScreen from "./screens/HomeScreen";
import CanvasScreen from "./screens/CanvasScreen";
import GalleryScreen from "./screens/GalleryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AccessibilityScreen from "./screens/AccessibilityScreen";
import GuardianAccountCreationScreen from "./screens/GuardianAccountCreationScreen";
import GuardianPasscodeScreen from "./screens/GuardianPasscodeScreen";
import GuardianAccountConfirmationScreen from "./screens/GuardianAccountConfirmationScreen";
import * as Font from 'expo-font';
import { SettingsProvider } from "./services/globalSettings"
import HamburgerButton from "./components/HamburgerButton";
import { ImageBackground } from "react-native";
import { theme } from "./config/theme";
import { guardianExists } from "./services/guardianLogic";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebaseConfig";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [guardianProfileExists, setGuardianProfileExists] = useState(null);
//** checks if a guardian profile exists for the current user. 
// Set to null initially so that it can be updated later without running into render errors. */
  const [isFontsLoaded, setFontsLoaded] = useState(false);
// this would be used to check if the fonts have been loaded before rendering the rest of the screen
  const [authInitialised, setAuthInitialised] = useState(false)


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
/* await function ensures the fonts are fully loaded before proceeding to loading the rest of the screen.*/
        'ClassicComicBoldItalic': require('./assets/fonts/Classic Comic Bold Italic.otf'),
        'ClassicComicBold': require('./assets/fonts/Classic Comic Bold.otf'),
        'ClassicComicItalic': require('./assets/fonts/Classic Comic Italic.otf'),
        'ClassicComicMediumItalic': require('./assets/fonts/Classic Comic Medium Italic.otf'),
        'ClassicComicMedium': require('./assets/fonts/Classic Comic Medium.otf'),
        'ClassicComic': require('./assets/fonts/Classic Comic.otf'),
        'ComicSansMS': require('./assets/fonts/Comic Sans MS.ttf'),
        'ComicMono-Bold': require('./assets/fonts/ComicMono-Bold.ttf'),
        'ComicMono': require('./assets/fonts/ComicMono.ttf'),
        'PatrickHand-Regular': require('./assets/fonts/PatrickHand-Regular.ttf'),
        'Schoolbell-Regular': require('./assets/fonts/Schoolbell-Regular.ttf'),
      });// the following are all the fonts that have been loaded from the fonts directory.
      setFontsLoaded(true);// sets the state of isFontsLoaded to true after the fonts have been loaded
    }
    loadFonts();

  }, []);// the empty array makes sure that the function is only called once when the page is loaded.


  useEffect(() => {
//handles the state change of firebase user authentication. triggering the setAuthInitialized state change
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthInitialised(true);
    });
    return unsubscribe
  }, []); // ensures function only checks on app mount and not on additional renders

  useEffect(() => {
    if (!authInitialised) return;// ensures auth is initialized before function runs

    const checkGuardianProfileExists = async () => {
      
      const profileExists = await guardianExists();// calls the guardianExists function
      console.log("Guardian profile exists:", profileExists);
      setGuardianProfileExists(profileExists);
    };// checks if the guardian profile exists and changes state to returned value
    checkGuardianProfileExists();
  }, [authInitialised]);// ensures function only runs when the auth has fully been initialised on app mount.

  if (!isFontsLoaded || !authInitialised || guardianProfileExists === null) {// guards
    return null;// if the fonts have not been loaded, it would return a null value and not render anything on the screen.
  }

  


  function DrawerNavigation() {
   return (
    <Drawer.Navigator 
    screenOptions={({ navigation }) => ({
    swipeEnabled: false,
    drawerActiveTintColor: theme.COLOURS.primary,
    drawerInactiveTintColor: theme.COLOURS.secondary,
    drawerLabelStyle: {
      fontFamily: theme.FONTS.formTitleFontFamily,
    }
    })}
    drawerContent={(props) => (
        <ImageBackground
        style={{flex: 1}}
        source={require('./assets/images/sliderdb.png')}
        resizeMode="cover"
        >
          <DrawerContentScrollView {...props} contentContainerStyle={{ padding: 20 }}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </ImageBackground>
      )}
    >
      

      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'HomeScreen', headerShown: false }}/>
      {guardianProfileExists
      ? (
        <Drawer.Screen name="GuardianPasscodeScreen" component={GuardianPasscodeScreen} options={{ title: 'Go to Guardian Account', headerShown: false }} />
      ): (
        <Drawer.Screen name="GuardianAccountCreationScreen" component={GuardianAccountCreationScreen} options={{ title: 'Guardian Account', headerShown: false }} />
      )
      }
    </Drawer.Navigator>
   )
  }


  return(
    <SettingsProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="HomeDrawer" component={DrawerNavigation} options={{gestureEnabled: false}} />
          <Stack.Screen name="CanvasScreen" component={CanvasScreen} />
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="AccessibilityScreen" component={AccessibilityScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="GuardianPasscodeScreen" component={GuardianPasscodeScreen} />
          <Stack.Screen name="GuardianAccountConfirmationScreen" component={GuardianAccountConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  )
}