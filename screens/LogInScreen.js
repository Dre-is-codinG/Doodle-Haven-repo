import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Animated, TouchableOpacity } from 'react-native';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme'; //imports theme object from config directory.
import DefaultButton from '../components/DefaultButton';//imports DefaultButton component from component directory.
import FormField from '../components/FormField';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function LogInScreen( { navigation } ) {

  const [Email, setEmail] = useState('');// sets the state for email in form field
  const [Password, setPassword] = useState(''); // sets the state for password in form field

  useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
      screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
      return () => { screenOrientation.unlockAsync(); 
  // tells react native to return the screen orientation to the default mode once the page is unloaded
      };
    }, []);// the empty array makes sure that the function is only called once when the page is loaded.
  return (
    <SafeAreaView style={styles.safeareastyle}>
      <Text style={styles.titleStyle}>Log In!</Text>
      <View style={styles.formView}>
        <FormField 
        title={"Email"}
        placeholder={"Enter your Email"}
        keyboardType={"email-address"}
        />
        <FormField 
        title={"Password"}
        placeholder={"Enter a Password"}/>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text>Haven't made an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={styles.LinkView}>
            <Text style={styles.linktext}> Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DefaultButton 
        title={"Log in!"}
        handlePress={() => console.log("Log in Button Pressed")}
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
    height: height * 0.4,
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