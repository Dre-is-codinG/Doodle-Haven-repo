import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import Canvas from '../components/canvas'; //imports canvas component from component directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/


export default function GalleryScreen({ navigation }) {

    const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
    screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
    return () => { screenOrientation.unlockAsync(); 
// tells react native to return the screen orientation to the default mode once the page is unloaded
    };
  }, []);// the empty array makes sure that the function is only called once when the page is loaded.
  
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

  return (
    <SafeAreaView style={styles.safeareastyle}>
      <Animated.View style={[{opacity: FadeInAnimation}, styles.AnimatedView]}>
        <Text style={styles.titleStyle}>Gallery</Text>
        <Text style={styles.subTitleStyle}>Create your first image!</Text>
        <View style={styles.imagesView}>
            <TouchableOpacity
            style={styles.addButtonStyle}
            activeOpacity={0.2}
            onPress={() => setShowButton(!showButton)}
            >
                <Text style={styles.addButtonTextStyle}>+</Text>
            </TouchableOpacity>
            {/* conditional rendering of the two buttons when the save button is pressed */}
            {showButton && (
                <View>
                    <TouchableOpacity
                style={styles.addButtonStyle}
                activeOpacity={0.2}
                onPress={() => setShowButton(!showButton)}
                >
                    <Text style={styles.addButtonTextStyle}>+</Text>
                </TouchableOpacity>
                </View>
            )}
        </View>
        
      </Animated.View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareastyle: {
    flex: 1,
    backgroundColor: theme.COLOURS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: theme.FONTS.supertitleFontSize,
    color: '#120C08',
    marginTop: 40,
    fontWeight: '500',
    fontFamily: theme.FONTS.titleFontFamily
  },
  subTitleStyle: {
    fontSize: theme.FONTS.titleFontSize,
    color: '#120C08',
    fontWeight: '300',
    fontFamily: theme.FONTS.subTitleFontFamily
  },
  AnimatedView: {
    alignItems: 'center',
    flex: 1,
  },
  addButtonStyle: {
    borderColor: theme.COLOURS.quinary,
    borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
    width: width * 0.4,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    marginTop: height * 0.02,
    backgroundColor: theme.COLOURS.innerbackground,
    marginHorizontal: width * 0.04
  },
  addButtonTextStyle: {
    fontSize: theme.FONTS.supertitleFontSize,
    fontFamily: theme.FONTS.titleFontFamily,
    color: theme.COLOURS.secondary
  },
  imagesView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
