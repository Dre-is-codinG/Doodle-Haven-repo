import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import Canvas from '../components/canvas'; //imports canvas component from component directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import { backgroundMusic } from '../services/sound';
import HamburgerButton from '../components/HamburgerButton';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function HomeScreen({ navigation }) {
  
  useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
    const lockScreenOrientation = async () => {
                await screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
            };
            lockScreenOrientation();// async function is called
    return () => { 
      screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP); 
// tells react native to return the screen orientation to the default mode once the page is unloaded
    };
  }, []);
  const FadeInAnimation = useRef(new Animated.Value(0)).current;
// this function would be used to run a fade in animation
  useEffect(() => {
    Animated.timing(FadeInAnimation, {
/* 
by storing the animated value in a ref, it would ensure that the value remains constant across re-renders of components.
The animated value of 0 refers to the initial opacity of the animated view. I would be create an effect where the opacity transitions
from the current value of its opacity to a value of 1, creating a fade-in effect.
For this animation, I would be using the .timing() method, this allows me to run animations that start from the referenced value
stored in current, to the wanted value, in this case, a value of 1 over a set duration.
*/
      toValue: 1,// this would set the opacity from its actual current value to an opactiy of 1.
      duration: 2000,// Using a duration of 2000ms or 2 seconds, it would allow the user to be able to notice the subtle animation
      useNativeDriver: true,// improves animation performance by using the native UI to run animations.
    }).start(() => {console.log("Fade in animation complete")});
/* 
The start method is important in running smooth animations from the beginning to the expected result without encountering
unexpected errors or rerenders. I am also using the console log callback, this informs me that the fade in animation successfully
loaded and is complete.
*/
  }, []);

  useEffect(() => {
    let player;

    async function playBackgroundMusic() {
      player = await backgroundMusic(require('../assets/sounds/ambient background sound.mp3'));
    }
    console.log("Music playing...");
    playBackgroundMusic();
    return () => {
      if (player) {
        player.pause();
        player.remove();
      }
      
  }}, []);

  return (

    <Animated.View style={[{opacity: FadeInAnimation}, styles.AnimatedView]}>
      <ImageBackground
      source={require('../assets/images/HomeWallpaper.png')}
      style={styles.safeareastyle}
      >
        <HamburgerButton onPress={() => navigation.toggleDrawer()} />
        <TouchableOpacity 
        style={styles.drawButtonStyle}
        activeOpacity={0.4}
        onPress={() => {navigation.navigate('CanvasScreen')}}
        >
          <Text style={styles.drawButtonTextStyle}>DRAW!</Text>
          <Image
          source={require('../assets/images/paint-palette.png')}
          style={styles.paletteImageStyle}
          />
        </TouchableOpacity>
        <View style={styles.box2}>
          <TouchableOpacity
          style={styles.galleryButtonStyle}
          activeOpacity={0.4}
          onPress={() => {navigation.navigate('GalleryScreen')}}
          >
            <Image 
            source={require('../assets/images/image-gallery.png')}
            style={styles.box2ImageStyle}
            />
            <Text style={styles.buttonTextStyle}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.settingsButtonStyle}
          activeOpacity={0.4}
          onPress={() => {navigation.navigate('SettingsScreen')}}
          >
            <Image 
            source={require('../assets/images/settings.png')}
            style={styles.box2ImageStyle}
            />
            <Text style={styles.buttonTextStyle}>SETTINGS</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='auto'/>
      </ImageBackground>
    </Animated.View>

  );
}
const styles = StyleSheet.create({
    safeareastyle: {
    flex: 1,
    backgroundColor: theme.COLOURS.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 1
  },
  AnimatedView: {
    alignItems: 'center',
    flex: 1,
  },
  drawButtonStyle: {
    width: width * 0.9,
    height: height * 0.45,
    alignItems:'center',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: height * 0.02,
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    opacity: 0.45,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    backgroundColor: theme.COLOURS.primary,
    borderWidth: 5
  },
  box2: {
    flexDirection: 'row',
  },
  galleryButtonStyle: {
    backgroundColor: theme.COLOURS.secondary,
    width: width * 0.45,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: height * 0.02,
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    opacity: 0.5,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    marginHorizontal: width * 0.02,
    borderWidth: 5
  }, 
  settingsButtonStyle: {
    backgroundColor: theme.COLOURS.tertiary,
    width: width * 0.45,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: height * 0.02,
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    opacity: 0.5,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowColor: 'black',
    marginHorizontal: width * 0.02,
    borderWidth: 5
  },
  paletteImageStyle: {
    width: 200,
    height: 200
  },
  box2ImageStyle: {
    width: 120,
    height: 120
  },
  buttonTextStyle: {
    fontSize: theme.FONTS.subtitleFontSize,
    fontFamily: theme.FONTS.formTitleFontFamily,
    marginTop: 40
  },
  drawButtonTextStyle: {
    fontFamily: theme.FONTS.usernameFontFamily,
    fontSize: theme.FONTS.supertitleFontSize,
  }
});
