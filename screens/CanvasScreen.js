import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import Canvas from '../components/canvas'; //imports canvas component from component directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import { loadLastDrawing } from '../services/drawingLogic'
import { center } from '@shopify/react-native-skia';
import Snail from '../animations/Snail';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/


export default function CanvasScreen({ route }) {

    const [paths, setPaths] = useState([]); // handles the state of the called paths
    const [isLoading, setIsLoading] = useState(true);
    const [timer, setTimer] = useState(0);// handles the state of the local timer
    const passedPaths = route?.params?.paths;// this deconstructs the route parameters defined 

    useEffect(() => {
// ensures that the last paths are fetched when the canvas screen is first loaded
        const initCanvas = async () => {
        setIsLoading(true);

        if (passedPaths && passedPaths.length > 0) {
// this checks if the route parameter is empy, ensuring that if the user navigates from the gallery screen,
// the paths were not overwritten
        setPaths(passedPaths);
        } else {
        const lastPaths = await loadLastDrawing();
// if the route parameter is empty, meaning the user is navigating from the home screen, it loads the last
// drawn image.
        setPaths(lastPaths);
        }

        setIsLoading(false);
    };

    initCanvas();
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

      useEffect(() => {
        const interval = setInterval(() => {
        setTimer(prev => {
            if (prev >= 5) return 0; // after ever 5 seconds, the timer is reset back to 0
            return prev + 1; // the timer increases by 1 every second
        });
        }, 1000);// this ensures that the interval is in 1000 ms

        return () => clearInterval(interval);// this resets the time interval back to 0 once completed
      }, []); 
  return (
    <ImageBackground 
    source={require('../assets/images/Canvas Page background.png')}
    style={styles.safeAreaStyle}>
        {isLoading ? (
            <View style={styles.loadingView}>
                <Snail />
            </View>
        ) : (
            <View style={styles.canvasViewStyle}>
                <Canvas initialPaths={paths} />
            </View>
        )
    }
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: theme.COLOURS.background
    },
    canvasViewStyle: {
        margin: 'auto',
        marginTop: height * 0.08
    },
    loadingImage: {
        width: '100%',
        height: '100%'
    },
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 1,
        height: height * 1,
        paddingRight: 200
    },
    timerText: {
        marginLeft: width * 0.1
    }
})