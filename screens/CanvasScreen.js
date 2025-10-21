import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import Canvas from '../components/canvas'; //imports canvas component from component directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import { loadLastDrawing } from '../services/drawingLogic'

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function CanvasScreen() {

    const [paths, setPaths] = useState([]); // handles the state of the called paths

    useEffect(() => {
// ensures that the last paths are fetched when the canvas screen is first loaded
        const fetchPaths = async () => {
            const lastPaths = await loadLastDrawing();
            setPaths(lastPaths);// sets the state of paths to the last paths
        };

        fetchPaths();
    }, []);// ensures the function runs once the screen is called

    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
        const lockScreenOrientation = async () => {
            await screenOrientation.lockAsync(screenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        };
        lockScreenOrientation();// async function is called
        return () => { 
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);  
    // tells react native to return the screen orientation to the default mode once the page is unloaded
        };
      }, []);
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.canvasViewStyle}>
            <Canvas  initialPaths={paths} />
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: theme.COLOURS.background
    },
    canvasViewStyle: {
        margin: 'auto',
        marginTop: height * 0.02
    }
})