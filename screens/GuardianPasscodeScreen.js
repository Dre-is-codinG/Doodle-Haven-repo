import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import DefaultButton from '../components/DefaultButton';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import HamburgerButton from '../components/HamburgerButton';
import { verifyGuardianPasscode } from '../services/guardianLogic';
import PeekingMonkey from '../animations/PeekingMonkey';
import Profile from '../animations/Profile';
import Peek from '../animations/Peek';

const {height, width} = Dimensions.get('window')
export default function GuardianPasscodeScreen({ navigation }) {
    const [passcode, setPasscode] = useState("");
    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
            return () => { screenOrientation.unlockAsync(); 
        // tells react native to return the screen orientation to the default mode once the page is unloaded
            };
          }, []);

    const handleGuardianPasscodeCheck = async () => {
        const result = await verifyGuardianPasscode(passcode);
// runs the verification process on the current state of the passcode variable.
        if (result) {
            navigation.navigate("GuardianAccountConfirmationScreen");
// if passcode is correct, redirects user to guardian account confirmation screen.
        } else {
            alert("Incorrect passcode");
// else, informs user that the passcode is incorrect.
        }
    }

  return (
    <ImageBackground source={require('../assets/images/guardianBG.png')} style={styles.mainContainer}>
      <HamburgerButton onPress={() => navigation.toggleDrawer()} />
      <View style={styles.radiustestview}>
        <Profile />
      </View>
      <View style={styles.formview}>
        <TextInput 
        style={styles.formtext}
        value={passcode}
        onChangeText={number => setPasscode(number)}
        placeholder={"Enter a passcode (4-digit)         "}
        keyboardType={"numeric"}
        secureTextEntry={true}
        maxLength={4}
      />
      </View>
      
      <DefaultButton 
      title={"continue"}
      handlePress={handleGuardianPasscodeCheck}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLOURS.background,
        alignItems: 'center',
    },
    pfpStyle: {
        width: width * 0.65,
        height: height * 0.3,
        marginBottom: height * 0.04,
        marginTop: height * 0.1
    },
    formview: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.9,
        height: 60,
        backgroundColor: theme.COLOURS.innerbackground,
        borderRadius: 10,
        borderColor: "#78571e",
        borderWidth: 2,
    },
    formtext: {
        flex: 1,
        fontSize: theme.FONTS.regularFontSize,
        paddingLeft: 12,
    },
  radiustestview: {
    marginTop: height * 0.1,
    width: width * 0.5,
    height: height * 0.25,
    backgroundColor: '#ddc9ae3c',
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: theme.BUTTONS.softButtonShadow,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: height * 0.05
  },
})