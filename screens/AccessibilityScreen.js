import { View, Text, TextInput, Switch, Dimensions, ScrollView, StyleSheet } from 'react-native';
import React,{ useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as screenOrientation from 'expo-screen-orientation';
import { theme } from '../config/theme';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';
import DefaultButton from '../components/DefaultButton';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function AccessibilityScreen() {
// the following control the states of the preferences
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [dob, setdob] = useState("");
    const [favouriteColour, setFavouriteColour] = useState("");
    const [theme, setTheme] = useState("");
    const [lightContrast, setLightContrast] = useState("");
    const [disableFlashingLights, setDisableFlashLights] = useState(false);
    const [backgroundWhiteNoise, setBackgroundWhiteNoise] = useState(false);
    const [lightingIntensitySensitivity, setLightIntesitySensitivity] = useState("");
    const [animationStyle, setAnimationStyle] = useState("");
    const [soundPreference, setSoundPreference] = useState("");
    const [visionCondition, setVisionCondition] = useState("");
    const [overallColourScheme, setOverallColourScheme] = useState("");
    const [colourRecommendation, setColourRecommendation] = useState("");
    const [dominantColour, setDominantColour] = useState("");
    const [colourBlindEffect, setColourBlindEffect] = useState(false);

    const sumbit = () => {// handles the submission of values to the database
        const pref = {
            FirstName,
            LastName,
            DateOfBirth: dob,
            favouriteColour,
            themePreference: theme,
            lightContrast,
            disableFlashingLights,
            backgroundWhiteNoise,
            lightingIntensitySensitivity,
            animationStyle,
            soundPreference,
            visionCondition,
            overallColourScheme,
            colourRecommendation,
            dominantColour,
            colourBlindEffect
        }
    };

    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
        screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
        return () => { screenOrientation.unlockAsync(); 
    // tells react native to return the screen orientation to the default mode once the page is unloaded
        };
      }, []);// the empty array makes sure that the function is only called once when the page is loaded.
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Accessibility Form</Text>
        <ScrollView style={styles.scrollView}>
            <TextInput
            style={styles.textInput}
            placeholder="enter First Name"
            value={FirstName}
            onChangeText={setFirstName}
            />
            <TextInput 
            style={styles.textInput}
            placeholder="enter last Name"
            value={LastName}
            onChangeText={setLastName}
            />
            <TextInput 
            style={styles.textInput}
            placeholder="enter Date of Birth - YYYY-mm-dd"
            value={dob}
            onChangeText={setdob}
            />
            <TextInput 
            style={styles.textInput}
            placeholder="set Favourite Colour"
            value={favouriteColour}
            onChangeText={setFavouriteColour}
            />
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            value={theme}
            onValueChange={setTheme}
            />
            <TextInput 
            style={styles.textInput}
            placeholder="set Light Contrast"
            value={lightContrast}
            onChangeText={setLightContrast}
            />
            <Switch
            value={disableFlashingLights}
            onValueChange={setDisableFlashLights}
            />
            <Slider 
            style={styles.slider}
            value={backgroundWhiteNoise}
            onValueChange={setBackgroundWhiteNoise}
            />
            <Slider 
            style={styles.slider}
            value={lightingIntensitySensitivity}
            onValueChange={setLightIntesitySensitivity}
            />
            <Switch
            value={animationStyle}
            onValueChange={setAnimationStyle}
            />
            <Slider 
            style={styles.slider}
            value={soundPreference}
            onValueChange={setSoundPreference}
            />
            <Switch
            value={visionCondition}
            onValueChange={setVisionCondition}
            />
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            value={colourRecommendation}
            onValueChange={setColourRecommendation}
            />
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            value={overallColourScheme}
            onValueChange={setOverallColourScheme}
            />
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            value={dominantColour}
            onValueChange={setDominantColour}
            />
            <Switch
            value={colourBlindEffect}
            onValueChange={setColourBlindEffect}
            />
            <DefaultButton 
            title={"Save Changes"}
            />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLOURS.background
    },
    scrollView: {
        width: width * 1,
        marginHorizontal: 'auto',
        marginLeft: width * 0.025
    },
    textInput: {
        marginBottom: height * 0.03,
        backgroundColor: theme.COLOURS.innerbackground,
        height: height * 0.05,
        width: width * 0.95,
        fontFamily: theme.FONTS.formTitleFontFamily,
        borderColor: theme.COLOURS.quinary,
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
        borderRadius: 10,
        fontSize: theme.FONTS.miniregularFontSize
    },
    slider: {
        width: width * 0.9,
        margin: height * 0.02
    },
    colourPicker: {
        marginBottom: height * 0.03,
        width: width * 0.8,
        marginTop: height * 0.02
    },
    title: {
        fontFamily: theme.FONTS.titleFontFamily,
        fontSize: theme.FONTS.titleFontSize,
        color: theme.COLOURS.tertiary,
        marginBottom: height * 0.02
    }
})