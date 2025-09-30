import { View, Text, TextInput, Switch, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React,{ useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as screenOrientation from 'expo-screen-orientation';
import { theme } from '../config/theme';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';
import DefaultButton from '../components/DefaultButton';
import ColourPicker from '../components/ColourPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sub } from '@shopify/react-native-skia';
import { saveUserPreferences } from '../services/dbLogic';

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
export default function AccessibilityScreen({ navigation }) {
// the following control the states of the preferences
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [dob, setdob] = useState("");
    const [favouriteColour, setFavouriteColour] = useState("");
    const [lightContrast, setLightContrast] = useState(0);
    const [disableFlashingLights, setDisableFlashLights] = useState(false);
    const [backgroundWhiteNoise, setBackgroundWhiteNoise] = useState(0);
    const [lightingIntensitySensitivity, setLightIntesitySensitivity] = useState(0);
    const [animationStyle, setAnimationStyle] = useState("");
    const [soundPreference, setSoundPreference] = useState(0);
    const [visionCondition, setVisionCondition] = useState("");
    const [overallColourScheme, setOverallColourScheme] = useState("");
    const [colourRecommendation, setColourRecommendation] = useState("");
    const [dominantColour, setDominantColour] = useState("");
    const [colourBlindEffect, setColourBlindEffect] = useState(false);
    const [color, setColor] = useState("#ffffffff");
    // this function would be used to handle the state of the colours in the colour picker
    const [showButton, setShowButton] = useState(false);
    const [showFavouriteColourButton, setShowFavouriteColourButton] = useState(false);
    const [showRecommendationButton, setShowRecommendationButton] = useState(false);
    const [showDominantColourButton, setShowDominantColourButton] = useState(false);

    const submit = () => {// handles the submission of values to the database
        const pref = {
            FirstName,
            LastName,
            DateOfBirth: dob,
            favouriteColour,
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
        saveUserPreferences(pref);  // Saves the user's preferences to SQLite database
        console.log('Preferences saved:', pref);// console logs each preference to see if it saved correctly
        // navigation.navigate('HomeScreen'); // Navigates to the home screen after saving the preferences
    };

    useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
        screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
        return () => { screenOrientation.unlockAsync(); 
    // tells react native to return the screen orientation to the default mode once the page is unloaded
        };
      }, []);// the empty array makes sure that the function is only called once when the page is loaded.
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.formItemView}>
            <Text style={styles.title}>Accessibility Form</Text>
        </View>
        <ScrollView style={styles.scrollView}>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your First name *</Text>
            <TextInput
            style={styles.textInput}
            placeholder="enter First Name"
            value={FirstName}
            onChangeText={setFirstName}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your Last name *</Text>
            <TextInput 
            style={styles.textInput}
            placeholder="enter last Name"
            value={LastName}
            onChangeText={setLastName}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your Date of Birth *</Text>
            <DateTimePicker 
            value={dob ? new Date(dob) : new Date()}
// this sets the date of birth to the selected birth or return the current date
            mode='date'
            display='default'
            onChange={(_, selectedDate) => {// handles the change of the date of birth to the selected date
                if (selectedDate) {
                    setdob(selectedDate.toISOString().split("T")[0]);
                    console.log(dob)
                }
            }}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>click on the button to Chose your favourite colour *</Text>
            <TouchableOpacity 
            style={[styles.functionButtons, { backgroundColor: favouriteColour || '#fff' }]}
            onPress={() => setShowFavouriteColourButton(!showFavouriteColourButton)}// uses the specified state
            />
            {showFavouriteColourButton && (
                <View style={styles.buttonView}>
                    <ColorPicker 
                    swatches={false}
                    color={favouriteColour}
                    onColorChange={(colour) => {
                        setColor(favouriteColour)// uses targeted value
                        setFavouriteColour(colour)
                    }}
                    thumbSize={40}
                    style={styles.colourPickerStyle}
                    />
                </View>
            )}
            </View>
            
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>set light contrast</Text>
            <Slider 
            maximumValue={100}
            minimumValue={0}
            style={styles.slider}
            value={lightContrast}
            onValueChange={setLightContrast}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Flashing Lights</Text>
                <Switch
                style={styles.switch}
                value={disableFlashingLights}
                onValueChange={setDisableFlashLights}
                />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Volume of White noise</Text>
            <Slider
            maximumValue={100}
            minimumValue={0}
            style={styles.slider}
            value={backgroundWhiteNoise}
            onValueChange={setBackgroundWhiteNoise}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Light Intensity</Text>
            <Slider 
            maximumValue={100}
            minimumValue={0}
            style={styles.slider}
            value={lightingIntensitySensitivity}
            onValueChange={setLightIntesitySensitivity}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Soft Animation Style</Text>
                <Switch
                style={styles.switch}
                value={animationStyle}
                onValueChange={setAnimationStyle}
                />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Sound Volume</Text>
            <Slider 
            maximumValue={100}
            minimumValue={0}
            style={styles.slider}
            value={soundPreference}
            onValueChange={setSoundPreference}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Visual Support</Text>
                <Switch
                style={styles.switch}
                value={visionCondition}
                onValueChange={setVisionCondition}
                />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>chose recommended scheme</Text>
            <TouchableOpacity 
            style={[styles.functionButtons, { backgroundColor: colourRecommendation || '#fff' }]}
            onPress={() => setShowRecommendationButton(!showRecommendationButton)}
            />
            {showRecommendationButton && (
                <View style={styles.buttonView}>
                    <ColorPicker 
                    swatches={false}
                    color={colourRecommendation}
                    onColorChange={(colour) => {
                        setColor(colourRecommendation)
                        setColourRecommendation(colour)
                    }}
                    thumbSize={40}
                    style={styles.colourPickerStyle}
                    />
                </View>
            )}
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Overall colour scheme</Text>
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            value={overallColourScheme}
            onValueChange={setOverallColourScheme}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Select Dominant colour</Text>
            <TouchableOpacity 
            style={[styles.functionButtons, { backgroundColor: dominantColour || '#fff' }]}
            onPress={() => setShowDominantColourButton(!showDominantColourButton)}
            />
            {showDominantColourButton && (
                <View style={styles.buttonView}>
                    <ColorPicker 
                    swatches={false}
                    color={dominantColour}
                    onColorChange={(colour) => {
                        setColor(dominantColour)
                        setDominantColour(colour)
                    }}
                    thumbSize={40}
                    style={styles.colourPickerStyle}
                    />
                </View>
            )}
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Colour Blind effect</Text>
                <Switch
                style={styles.switch}
                value={colourBlindEffect}
                onValueChange={setColourBlindEffect}
                />
            </View>
            <DefaultButton 
            title={"Save Changes"}
            handlePress={submit}
            />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.COLOURS.innerbackground
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
        fontSize: theme.FONTS.miniregularFontSize,
        padding: width * 0.02
    },
    slider: {
        width: width * 0.9,
        margin: height * 0.02,
    },
    switch:{
        flex: 1,
        marginLeft: width * 0.2
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
    },
    formHeaderText: {
        fontFamily: theme.FONTS.normaltextFontFamily,
        color: theme.COLOURS.tertiary,
        fontSize: theme.FONTS.miniregularFontSize,
        padding: height * 0.01
    },
    functionButtons: {
    width: width * 0.1,
    height: height * 0.08,
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: width * 0.05,
    marginVertical: (height * 0.04),
    padding: height * 0.05,
  },
  buttonView: {
    width: width * 0.05,
    height: height * 0.3,
    marginHorizontal: 'auto'
  },
  colourPickerStyle: {
    width: width * 0.05,
    height: height * 0.05
  },
  switchAndTextView: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: theme.COLOURS.tertiary,
    marginVertical: height * 0.02
  },
  formItemView: {
    borderBottomWidth: 3,
    borderColor: theme.COLOURS.tertiary,
    marginVertical: height * 0.02,
    justifyContent: 'center'
  }
})