import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity, Button, ScrollView, ImageBackground } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import ImagePreview from '../components/imagePreview';
import { liveUpdateGallery, deleteDrawing } from '../services/drawingLogic';

const {height, width} = Dimensions.get('window')
/* Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/

export default function GalleryScreen({ navigation }) {
  
  const [art, setArt] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // This state will track which drawing is "clicked"

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
/* by storing the animated value in a ref, it would ensure that the value remains constant across re-renders of components.
The animated value of 0 refers to the initial opacity of the animated view. I would be create an effect where the opacity transitions
from the current value of its opacity to a value of 1, creating a fade-in effect.
For this animation, I would be using the .timing() method, this allows me to run animations that start from the referenced value
stored in current, to the wanted value, in this case, a value of 1 over a set duration.
*/
      toValue: 1,// this would set the opacity from its actual current value to an opactiy of 1.
      duration: 2000,// Using a duration of 2000ms or 2 seconds, it would allow the user to be able to notice the subtle animation
      useNativeDriver: true,// improves animation performance by using the native UI to run animations.
    }).start(() => {console.log("Fade in animation complete")});
/* The start method is important in running smooth animations from the beginning to the expected result without encountering
unexpected errors or rerenders. I am also using the console log callback, this informs me that the fade in animation successfully
loaded and is complete.
*/
  }, []);

  useEffect(() => {
// this handles real time updates in the library by defining the state of art
    const disconnect = liveUpdateGallery(setArt);
    return () => disconnect();
  }, []);// this function would only be called once the screen is called and fully rendered.

  useEffect(() => {// this function would count the number of drawings load everytime the screen is called
    if (art.length > 0) {
      console.log("Gallery Mounted: there are", art.length, "drawings.");
      
      art.forEach((drawing, index) => {
// for each drawing that loads, it returns the id and the number of strokes in teh drawing
        console.log(`Drawing #${index + 1}:`, {
          id: drawing.id,// this returns the id of the drawing
          pathCount: drawing.paths?.length || 0,// this returns the number of paths
        });
      });
    } else {
      console.log("🌵 Gallery Mounted: No drawings found in the database.");
      // if there are no drawings returned on screen mount, console logs this message informing me.
    }
  }, [art]); //this function is ran everytime the screen rerenders

  return (
    <ImageBackground 
    style={styles.safeareastyle}
    source={require('../assets/images/gallareyWallpaper.png')}
    >
      <Animated.View style={[{opacity: FadeInAnimation}, styles.AnimatedView]}>
        <View style={styles.titleView}>
          <Text style={styles.titleStyle}>Gallery</Text>
        </View>
        <ScrollView contentContainerStyle={styles.artContainer}>
          {art.length > 0 ? (// this teniary conditional prompt checks if the art array state is 0
            art.map((drawing) => {
              // this ensures that the selected drawing points to the appropriate id
              const isSelected = selectedId === drawing.id;

              return (
                <View key={drawing.id} style={styles.previewContainer}>
                  <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={() => {
                      const nextDrawingState = isSelected ? null : drawing.id;
                      console.log("Drawing Selected:", drawing.id, "| Selected:", nextDrawingState);
                      setSelectedId(nextDrawingState);
                    }}
                  >
                    <ImagePreview 
                      paths={drawing.paths || [] } 
                      isSelected={isSelected}
                      id={drawing.id}
                    />
                  </TouchableOpacity>

                  {isSelected && (
                    <View style={styles.actionRow}>
                      <TouchableOpacity 
                        style={[styles.optionalButtonStyle, {backgroundColor: '#be3f3f'}]}
                        onPress={() => {
                          console.log("Deleted drawing id:", drawing.id);
                          deleteDrawing(drawing.id);
                        }}
                      >
                        <Text style={styles.buttonText}>DELETE</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.optionalButtonStyle, {backgroundColor: '#4ecd7f'}]}
                        onPress={() => {
                          console.log("Continued drawing ID:", drawing.id);
                          navigation.navigate('CanvasScreen', { paths: drawing.paths });
                        }}
                      >
                        <Text style={styles.buttonText}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )
            })
          ):(
            <Text>Start drawing!, this place is empty 🌵...</Text>
          )}
        </ScrollView>
      </Animated.View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeareastyle: {
    flex: 1,
    backgroundColor: theme.COLOURS.innerbackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: theme.FONTS.supertitleFontSize,
    color: "black",
    fontWeight: '500',
    fontFamily: theme.FONTS.formTitleFontFamily,
    marginTop: height * 0.05,
    textAlign: 'center'
  },
  titleView: {
    marginVertical: height * 0.02,
    borderBottomColor: theme.COLOURS.quaternary,
    borderBottomWidth: 8,
    width: width * 1
  },
  AnimatedView: {
    alignItems: 'center',
    flex: 1,
  },
  artContainer: {
    flexDirection: 'column',
    width: width,
    paddingBottom: 50,
    alignItems: 'center'
  },
  previewContainer: {
    marginBottom: 30, // Space between drawings
    alignItems: 'center',
    width: width,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: -20, // This makes the buttons overlap the bottom of the frame like a sticker
    zIndex: 10,
    elevation: 5,
  },
  optionalButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: 'white', // Gives it that "cool" sticker look
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 12,
    fontFamily: theme.FONTS.buttontextFontFamily
  }
});