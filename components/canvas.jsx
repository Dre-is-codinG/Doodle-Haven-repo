import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
/* 
 The dimensions object from the react native module allows me to access and return the dimensions of the screen that renders the app.
 By accessing these dimensions for the screen, it would allow me to render the canvas to fit any screen size or type.
*/
import React, { useState } from 'react';
/*
 useState object from the react module would allow me to set states and functions assigned to each gesture on the canvas
*/
import { Svg, Path } from "react-native-svg"; 
/*
 Svg object creates a space that would allow the users to  draw on the canvas 
 Path object would allow me to track and record paths that are created as the user interacts with the Svg canvas component.
 */
import { theme } from '../config/theme'; //imports theme object from config directory.
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import base64 from 'react-native-base64';
import { File, Paths } from 'expo-file-system';
import * as Expo from 'expo';
import ColourPicker from './ColourPicker';
import Slider from '@react-native-community/slider'

 const {height, width} = Dimensions.get('window')

const Canvas = () => {
  const [paths, setPaths] = useState([]);
// this function would be used to create a state called paths, and using setPaths, continue to update it after a path has been set.
  const [currentPath, setcurrentPath] = useState([]);
// the currentPath refers to the path the user is currently creating, this starts with a value of 0
  const [bin, setbin] = useState([]);
// the bin would be used to store sliced paths
  const [showButton, setShowButton] = useState(false);
// this function would be used to create a state that determines if a button is visible
  const [color, setColor] = useState("#41566cff");
// this function would be used to handle the state of the colours in the colour picker
  const [strokeWidth, setStrokeWidth] = useState(10);
// this function would handle the width of each stroke

  const handleFingerMove = (event) => {
    const newPath = [...currentPath];
/*
 this new path is created whenever the user interacts with the canvas. This new path is then added onto the currentpath array that has 
 been spread out in a new array.
 this function specifically adds on to the already created currentPath array. It adopts all the data and points that have are currently
 in the currentPath array and add on to it with the new path
*/
    const Xpoint = event.nativeEvent.locationX;
    const Ypoint = event.nativeEvent.locationY;
/*
 returns the current location of the user's finger, digital pen or mouse on the canvas
 It is important to be able to access the location of touch on the canvas, allowing me to pass functions and events after certain
 actions.
*/
    const newPoint = `${newPath.length === 0 ? 'M' : 'L'}${Xpoint.toFixed(0)},${Ypoint.toFixed(0)} `;
/*
 this function allows me to create a new point.
 This function tells react native to check the newPath array's lenght, if the lenght is 0, this would infere that no point has been
 created as of yet, this means that the user is creating a "new" point. after which, the conditional function uses the react native 
 svg logic of using the letter L to tell react native to "line to" to the next point in the path, this creates a straight line.
*/
    newPath.push(newPoint);
/*
 this pushes the newPoint that has been created to the newPath array created when the user creates a path
 the creation of multiple arrays would allow me to access each created line at a time.
*/
    setcurrentPath(newPath);// sets currentPath value to newPath value
  };
 
  const handleFingerMotionEnd = () => {
    if (currentPath.length === 0) return;// checks if the currentPath is empty and if so, exists the function
    setPaths([...paths, { path: currentPath, color, strokeWidth }]);;// this changes the state of paths by including the the current path after the end of a line
    console.log("currentPath array: ", currentPath)// this logs and returns each coordinate in the terminal, this would be used to check if the code works
    setcurrentPath([]);// reverts the currentPath array to 0, ending the creation of a line
  };

  const undoFunction = () => {
    console.log("paths array: ", paths);
    if (paths.length === 0) return;
/* 
  this tells React native to break the function and not continue if the paths array is empty in order to avoid getting the undefined 
  error if there are no paths in the paths array.
*/
    const removedPath = paths[paths.length - 1]
    /*
    Because React Native arrays are zero indexed, the final path would be 1 less than the path lenght, it is also improtant to be able 
    to access a variable defined by the final path in order to avoid encountering any errors when the array becomes large.
    This variable is also dynamic and changes everytime the user uses the undo button and can be easier to re-access this variables 
    latern on.
    */
    setPaths(paths.slice(0, -1));
    setbin([...bin, removedPath]);
    /* uses the useState "setPaths" to indirectly mutate the state of the paths array and using the slice method to mutate the paths
       array to exlude the last item in it.
    */
    console.log("bin: ", bin)
  };

  const redoFunction = () => {
    if (bin.length === 0) return;// checks if the bin is empty, and if true, exists the function
    const restoredPath = bin[bin.length - 1]
/*  
    by making a variable that directly stores the last path stored in the bin, it would allow me to easily access this value without 
    the need to directly reference it when attempting to mutate the states of the current paths array.
*/
    setPaths([...paths, restoredPath]);
/*
    this function accesses the bin array and includes the first item in the bin array and includes it back to the paths array by using
    sets the state of paths to include this removed path.
*/
    setbin(prev => prev.slice(0, -1))// this returns the last item in bin and removes it from the bin array
/*
    The use of the prev, ensures that react native is working with the most recent state of the bin array, this would avoid any 
    unexpected or undefined errors in an event where the bin array is recieving a large amount of paths or is being rapidly mutated.
    The new state of the bin is defined by all the paths excluding the first path. by doing so, it would be able to remove a path after
    it had been called.
*/
  };

  const clearFunction = () => {
    if (paths.length === 0 && currentPath.length === 0) return;// this prevents an undefined error when trying to clear an empty canvas
    const clearedPaths = [...paths];// this spreads all paths and places each of them in one array
    if (currentPath.length && paths.length > 0){
      clearedPaths.push(currentPath)
/* #
  checks to see if both arrays have paths in them, then pushes this combined array to the currentpath, by doing so, when clearing the
  canvas, the components of the current path can still be included.
*/
    };
    setbin(prev => [clearedPaths, ...prev]);
/*
    This sets the state of the previous state of the bin array to include the cleared paths in the beginning.
    The importance of having the cleared paths in the beginning prevents it from appearing at the end when the state has been mutated
*/

    setPaths([]);// sets the paths array to an empty array
    setcurrentPath([])// sets the currentpath array to an empty array
    console.log("current Paths: ", currentPath)
  }

  const createSVG = (paths, width, height) => {
// this function takes in the paths array, the width and height of each stroke created as arguments
    const svgPaths = paths // sets the variable svgPaths to the current state of the paths array
      .filter(path => path.length > 0) // ensures that empty arrays are excluded from svgPath
      .map(pathArray => 
// the map method loops through the path array and converts these arrays into concactinated strings
        `
        <path
          d="${pathArray.join(' ')}"
          stroke="black"
          fill="transparent"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      `)// stores the styling and information about the strokes when being stored
      .join('')
      .trim();
/* 
 turns all the items into a singular string, this allows for the svg to be stored without being further 
 manipulated, and it would make it easier to recall the arrays 
*/

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${svgPaths}
      </svg>
    `;
/* 
 svg text is stored using xmlns which tells servers that the format of this text in memory is svg and the created
 svgPaths is called.
*/

  };


    const saveSVGtoGallery = async () => {
// this function would work on saving a generated svg file to the cache memory, which can later be pushed to firebase

     const svgString = createSVG(paths, 10, 10);
      try {
      const file = new File(Paths.cache, `Art_${Date.now()}`);
      file.create(); // can throw an error if the file already exists or no permission to create it
      file.write(svgString);
      console.log(file.textSync()); // Hello, world!
      console.log(file.uri)
    } catch (error) {
      console.error(error);
    }
    };

    return (
      <View style={styles.mainViewStyling}>
        <ColourPicker colour={color} setColour={setColor} />
        <View style={styles.sliderView}>
          <Slider
          style={styles.sliderStyle}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={strokeWidth}
          onValueChange={setStrokeWidth}
          minimumTrackTintColor={color}
          maximumTrackTintColor='#00000033'
          thumbTintColor='#acacacff'
          />
        </View>
        
        <View style={styles.container} onTouchMove={handleFingerMove} onTouchEnd={handleFingerMotionEnd}>
        <Svg style={styles.svgstyling}>
          {paths.map((item, index) => (
            <Path
            key={`path-${index}`}
            d = {item.path.join(' ')}
            stroke={item.color}
            fill="transparent"
            strokeWidth={item.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
          ))}
          {currentPath.length > 0 && (
            <Path 
            d = {currentPath.join(' ')}
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
          )}
        </Svg>

      </View>
        
        <ScrollView>
          <View style={styles.toolBarStyling}>
            <TouchableOpacity 
            style={styles.functionButtons}
            onPress={undoFunction}
            >
              <Image
              source={require('../assets/images/undo.png')}
              style={styles.buttonImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={redoFunction}
            style={styles.functionButtons}>
              <Image
              source={require('../assets/images/redo.png')}
              style={styles.buttonImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => setShowButton(!showButton)}
            style={styles.functionButtons}>
              <Image
              source={require('../assets/images/folder.png')}
              style={styles.buttonImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={clearFunction}
            style={styles.functionButtons}>
              <Image
              source={require('../assets/images/broom.png')}
              style={styles.buttonImageStyle}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      {/* conditional rendering of the two buttons when the save button is pressed */}
          {showButton && (
            <View style={styles.optionalViewStyling}>
              <View style={styles.innerOptionalButtonView}>
                <TouchableOpacity
                onPress={() => saveSVGtoGallery()}
                >
                  <Text style={styles.optionalButtonTextStyling}>Save art to gallery!</Text>
                </TouchableOpacity>
              </View>
                <TouchableOpacity
                onPress={() => console.log("Art has been exported")}
                >
                  <Text style={styles.optionalButtonTextStyling}>Export art!</Text>
                </TouchableOpacity>
            </View>
          )}
          
          
    </View>
  )
}

export default Canvas

const styles = StyleSheet.create({
  mainViewStyling: {
    flexDirection: 'row'
  },
  container: {
    backgroundColor: "#fff",
    marginLeft: width * 0.06
  },
  svgstyling: {
    height: height * 0.9,
    width: width * 0.7,
    borderWidth: 4,
    borderRadius: 10,
  },
  toolBarStyling: {
    width: width * 0.15,
    height: height * 1.25,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: theme.COLOURS.primary,
    marginHorizontal: 20,
    flexWrap: 'wrap', // allows for the tool buttons to go to the next line if they do not fit in the toolbar box.
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1000
  },
  functionButtons: {
    width: width * 0.1,
    height: height * 0.2,
    borderWidth: 2,
    borderRadius: 30,
    marginHorizontal: width * 0.02,
    marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonImageStyle: {
    width: '50%',
    height: '50%'
  },
  optionalViewStyling: {
  marginTop: 10,
  borderColor: '#000',
  borderWidth: 2,
  borderRadius: theme.BUTTONS.sharpButtonRadius,
  padding: 5,
  position: 'absolute',
  top: height * 0.3,
  right: width * 0.4,
  zIndex: 1000,
  backgroundColor: theme.COLOURS.primary
  },
  optionalButtonTextStyling: {
  fontFamily: theme.FONTS.formTitleFontFamily,
  padding: 8,
  fontSize: theme.FONTS.miniregularFontSize,
  textAlign: 'center'
  },
  innerOptionalButtonView: {
    borderBottomWidth : 2,
  },
  sliderView: {
    marginTop: height * 0.2,
    width: width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: width * -0.02
    
  },
  sliderStyle: {
    width: width * 0.2,
    height: height * 0.05,
    transform: [{ rotate: '-90deg' }],
    
  }
})