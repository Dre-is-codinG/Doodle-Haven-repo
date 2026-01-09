import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import DefaultButton from '../components/DefaultButton';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import HamburgerButton from '../components/HamburgerButton';

const {height, width} = Dimensions.get('window')
export default function GuardianPasscodeScreen() {
    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
            return () => { screenOrientation.unlockAsync(); 
        // tells react native to return the screen orientation to the default mode once the page is unloaded
            };
          }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image 
      source={require('../assets/images/pfp.png')}
      style={styles.pfpStyle}
      />
      <FormField 
      placeholder={"Enter a passcode (4digit)         "}
      keyboardType={"numeric"}
      />
      <DefaultButton 
      title={"Save Passcode"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLOURS.background,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: theme.FONTS.titleFontSize,
        color: '#000',
        fontFamily: theme.FONTS.formTitleFontFamily,
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        textAlign: 'center'
    },
    pfpStyle: {
        width: width * 0.65,
        height: height * 0.3,
    },
    messageView: {
        marginLeft: width * 0.35,
        marginTop: height * -0.1,
        width: width * 0.55,
        backgroundColor: theme.COLOURS.innerbackground,
        marginBottom: height * 0.05,
    },
    messageText: {
        fontSize: theme.FONTS.miniregularFontSize,
        fontFamily: theme.FONTS.subTitleFontFamily,
        padding: 10
    }
})