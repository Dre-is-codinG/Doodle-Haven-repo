import React, { useEffect, useState } from "react";
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
import * as Font from 'expo-font';
import { SettingsProvider } from "./services/globalSettings"

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFontsLoaded, setFontsLoaded] = useState(false);
// this would be used to check if the fonts have been loaded before rendering the rest of the screen


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
  if (!isFontsLoaded) {
    return null;// if the fonts have not been loaded, it would return a null value and not render anything on the screen.
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
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="CanvasScreen" component={CanvasScreen} />
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="AccessibilityScreen" component={AccessibilityScreen} options={{gestureEnabled: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  )
}