import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import Canvas from '../components/canvas'; //imports canvas component from component directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import ColourPicker from '../components/ColourPicker';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function SettingsScreen() {
    const [color, setColor] = useState("#41566cff");

  return (
    <SafeAreaView>

    </SafeAreaView>
  )
}

