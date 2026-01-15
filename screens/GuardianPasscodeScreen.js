import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import DefaultButton from '../components/DefaultButton';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import HamburgerButton from '../components/HamburgerButton';
import { setGuardianPasscode } from '../services/guardianLogic';

const {height, width} = Dimensions.get('window')
export default function GuardianPasscodeScreen({ navigation }) {
    const [passcode, setPasscode] = useState(1234);
    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
            return () => { screenOrientation.unlockAsync(); 
        // tells react native to return the screen orientation to the default mode once the page is unloaded
            };
          }, []);

    const handleStoreGuardianPasscode = async () => {
        const result = await setGuardianPasscode(passcode);

    }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HamburgerButton onPress={() => navigation.toggleDrawer()} />
      <Image 
      source={require('../assets/images/pfp.png')}
      style={styles.pfpStyle}
      />
      <View style={styles.formview}>
        <TextInput 
        style={styles.formtext}
        value={passcode}
        handleChangeText={number => setPasscode(number)}
        placeholder={"Enter a passcode (4-digit)         "}
        keyboardType={"numeric"}
        secureTextEntry={true}
        maxLenght={4}
      />
      </View>
      
      <DefaultButton 
      title={"continue"}
      handlePress={() => {navigation.navigate("GuardianAccountConfirmationScreen")}}
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