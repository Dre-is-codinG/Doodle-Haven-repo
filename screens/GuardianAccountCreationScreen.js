import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import DefaultButton from '../components/DefaultButton';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import HamburgerButton from '../components/HamburgerButton';

const {height, width} = Dimensions.get('window')

export default function GuardianAccountCreationScreen({ navigation }) {

    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
        screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
        return () => { screenOrientation.unlockAsync(); 
    // tells react native to return the screen orientation to the default mode once the page is unloaded
        };
      }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HamburgerButton onPress={() => navigation.toggleDrawer()} />  
      <Text style={styles.screenTitle}>Create a Parent / Carer Account</Text>
      <Image 
      source={require('../assets/images/pfp.png')}
      style={styles.pfpStyle}
      />
      <View style={styles.messageView}>
        <Text style={styles.messageText}>Parents and Carers can view their child account drawings and progress</Text>
      </View>
      <FormField 
      title={"Parent/Carer Name"}
      placeholder={"What is your name?          "}
      keyboardType={"default"}
      />
      <FormField 
      title={"Parent/Carer Email"}
      placeholder={"What is your email?         "}
      keyboardType={"email-address"}
      />
      <DefaultButton 
      title={"Create Account"}
      handlePress={() => {navigation.navigate("GuardianPasscodeScreen")}}
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
        left: width * -0.3,
        
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