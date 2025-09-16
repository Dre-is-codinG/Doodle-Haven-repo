import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity, } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import FormField from '../components/FormField';
import { Link } from '@react-navigation/native';
import { signUp } from '../services/authLogic';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/

export default function SignUpScreen( { navigation } ) {

  const [Email, setEmail] = useState('');// sets the state for email in form field
  const [Username, setUsername] = useState(''); // sets the state for username in form field
  const [Password, setPassword] = useState(''); // sets the state for password in form field

  useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
      screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
      return () => { screenOrientation.unlockAsync(); 
  // tells react native to return the screen orientation to the default mode once the page is unloaded
      };
    }, []);// the empty array makes sure that the function is only called once when the page is loaded.
  return (
    <SafeAreaView style={styles.safeareastyle}>
      <Text style={styles.titleStyle}>Sign Up!</Text>
      <View style={styles.formView}>
        <FormField 
        title={"Email"}
        placeholder={"Enter your Email"}
        keyboardType={"email-address"}
        value={Email}
        handleChangeText={text => setEmail(text)}
        />
        <FormField 
        title={"Username"}
        placeholder={"Enter your Username"}
        value={Username}
        handleChangeText={text => setUsername(text)}
        />
        <FormField 
        title={"Password"}
        placeholder={"Enter a Password"}
        value={Password}
        handleChangeText={text => setPassword(text)}
        /> 
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')} style={styles.LinkView}>
            <Text style={styles.linktext}> Log In!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DefaultButton 
        title={"Sign Up!"}
        handlePress={async () => {// async function waits for Firebase promises
          console.log("Sign Up Button Pressed"); 
          const result = await signUp(Email, Password, Username); 
          if (result.error) { // returns error message when encountring an error when attempting to sign up
            console.log("Error signing up: ", result.error); 
            alert("Error signing up: " + result.error);
            // console logs errors that were encountered when attempting to register the user
          } else { 
            console.log("User signed up successfully: ", result.user);
            // if no errors werre encountered, user's details is logged to console
            alert("User signed up successfully!"); // sends alert that no errors were encountered
            setTimeout(() => {// delays console log so that firebase validation routines can be fully finished
              navigation.navigate('HomeScreen');// aftwards navigates user to homescreen.
            }, 0)
          }}
        }
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareastyle: {
    flex: 1,
    backgroundColor: theme.COLOURS.background,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: theme.FONTS.supertitleFontSize,
    color: theme.COLOURS.quaternary,
    marginTop: 50,
    fontWeight: '500',
    fontFamily: 'ClassicComic'
  },
  subTitleStyle: {
    fontSize: theme.FONTS.subtitleFontSize,
    color: '#120C08',
    fontWeight: '300',
    fontFamily: theme.FONTS.subTitleFontFamily
  },
  formView : {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.99,
    height: height * 0.6,
    backgroundColor: theme.COLOURS.background,
    borderColor: theme.COLOURS.quaternary,
    borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
    borderRadius: theme.BUTTONS.smoothButtonRadius,
  },
  linktext: {
    color: theme.COLOURS.tertiary,
    fontWeight: '500',
    fontSize: theme.FONTS.miniregularFontSize,
    fontFamily: theme.FONTS.subTitleFontFamily
  },
  LinkView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});