import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react'
import { getGuardianDetails, getChildAccountDetails } from '../services/guardianLogic';
import Profile from '../animations/Profile';

const {height, width} = Dimensions.get('window')

export default function GuardianAccountConfirmationScreen({ navigation }) {
    const [guardianName, setGuardianName] = useState("John Doe");
    const [childAccount, setChildAccount] = useState("John Doe Jr.")


    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
            
            const loadAccountDetails = async () => {
                const guardian = await getGuardianDetails();// returns guardian details
                const child = await getChildAccountDetails();// returns child details
                if (guardian) {
                    setGuardianName(guardian);// sets guardianName to returned value of guardian function
                }
                if (child) {
                    setChildAccount(child);// sets the state of childAccount to the returned value of child
                }
            };
            loadAccountDetails();// calls function
            return () => { screenOrientation.unlockAsync(); 
        // tells react native to return the screen orientation to the default mode once the page is unloaded
            };
          }, []);


  return (
    <ImageBackground source={require('../assets/images/guardianBG.png')} style={styles.mainContainer}>
        <View style={styles.radiustestview}>
            <Profile />
        </View>
          <Text style={styles.formtitle}>Guardian:</Text>
          <View style={styles.formview}>
            <Text style={styles.formtext}>{guardianName || "Loading..."}</Text>
          </View>
          <Text style={styles.formtitle}>Child Account:</Text>
          <View style={styles.formview}>
            <Text style={styles.formtext}>{childAccount || "Loading..."}</Text>
          </View>
          <TouchableOpacity 
          style={styles.messageView}
          onPress={() => {navigation.navigate('ReportScreen')}}
          >
            <Text style={styles.messageText}>See drawing report</Text>
          </TouchableOpacity>
           <TouchableOpacity 
           style={styles.messageView2}
           onPress={() => {navigation.navigate('ChildGalleryScreen')}}
           >
            <Text style={styles.messageText}>See child's drawings</Text>
          </TouchableOpacity>
    </ImageBackground>
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
        left: width * -0.25,
        marginTop: height * 0.1,
        marginBottom: height * 0.05,
        marginLeft: width * -0.1,
        width: width * 0.4,
        height: height * 0.185
        
    },
    messageView: {
        marginTop: height * 0.1,
        width: width * 0.8,
        height: height * 0.06,
        backgroundColor: theme.COLOURS.innerbackground,
        marginBottom: height * 0.07,
        borderRadius: theme.BUTTONS.smoothButtonRadius,
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth
    },
    messageView2: {
        marginTop: height * -0.2,
        width: width * 0.8,
        backgroundColor: theme.COLOURS.innerbackground,
        marginBottom: height * 0.2,
        borderRadius: theme.BUTTONS.smoothButtonRadius,
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth
    },
    messageText: {
        fontSize: theme.FONTS.miniregularFontSize,
        fontFamily: theme.FONTS.titleFontFamily,
        padding: 10,
        textAlign: 'center',
        color: theme.COLOURS.tertiary
    },
    formview: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.95,
        height: 60,
        backgroundColor: theme.COLOURS.innerbackground,
        borderRadius: 10,
        borderColor: "#78571e",
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    formtext: {
        flex: 1,
        fontSize: theme.FONTS.regularFontSize,
        paddingLeft: 12,
    },
    formtitle: {
        flex: 1,
        fontSize: theme.FONTS.regularFontSize,
        paddingLeft: 12,
        textAlign: 'left',
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