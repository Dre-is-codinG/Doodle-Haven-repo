import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultButton from '../components/DefaultButton';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import { setGuardianPasscode } from '../services/guardianLogic';
import { hashPasscode } from '../services/hashLogic';

const {height, width} = Dimensions.get('window')
const GuardianAccountPasscodeSetScreen = ({ navigation }) => {

    const [passcode, setPasscode] = useState("");

        useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
                screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
                return () => { screenOrientation.unlockAsync(); 
            // tells react native to return the screen orientation to the default mode once the page is unloaded
                };
              }, []);
    
        const handleStoreGuardianPasscode = async () => {
            const result = await setGuardianPasscode(passcode);
        }

        const handlePasscodeCreation = async () => {
            if (passcode.length !== 4) {
                alert("Ensure that the passcode is 4 digits");
                return;// ensures passcode is 4 digits
            }
            const hashedPasscode = await hashPasscode(passcode);
            const result = await setGuardianPasscode(hashedPasscode)
// implements the hashPasscode function to the current state of the passcode variable
            if (result.success) {
                
                navigation.navigate("GuardianAccountConfirmationScreen");
// if hash is successful, it redirects user to the guardian account confirmation screen.
            } else {
                alert("Failed Hash, try again");
            }
        };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image 
      source={require('../assets/images/pfp.png')}
      style={styles.pfpStyle}
      />
      <View style={styles.formview}>
        <TextInput 
        style={styles.formtext}
        value={passcode}
        onChangeText={(digit) => {
            if (/^\d*$/.test(digit) && digit.length <= 4) {
        // this runs a check and ensures only an integer 4 digit number has been entered to passcode
                setPasscode(digit);// if the check returns true, it sets digit value to passcode.
            }
        }}
        placeholder={"Enter a passcode (4-digit)         "}
        keyboardType={"numeric"}
        maxLength={4}
      />
      </View>
      
      <DefaultButton 
      title={"continue"}
      handlePress={handlePasscodeCreation}
      />
    </SafeAreaView>
  )
}

export default GuardianAccountPasscodeSetScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLOURS.background,
        alignItems: 'center',
    },
    pfpStyle: {
        width: width * 0.65,
        height: height * 0.3,
        marginBottom: height * 0.04
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
})