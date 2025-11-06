import { View, Text, TextInput, Switch, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React,{ useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as screenOrientation from 'expo-screen-orientation';
import { theme } from '../config/theme';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';
import DefaultButton from '../components/DefaultButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettings } from "../services/globalSettings"

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/

export default function SettingsScreen() {
  // the following control the states of the preferences
      const { settings, changeSetting, manualSave, isloading } = useSettings();
      // this calls the custom useSettings() hook to handle states of each setting
      const [color, setColor] = useState("#ffffffff");
      // this function would be used to handle the state of the colours in the colour picker
      const [showFavouriteColourButton, setShowFavouriteColourButton] = useState(false);
  
      if (isloading) {
// ensures that while the settings are still loading, a loading screen is displayed
        return(
          <SafeAreaView style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={theme.COLOURS.tertiary}/>
            <Text style={styles.loadingText}>Loading...</Text>
          </SafeAreaView>
        );
      }

      useEffect(() => {//this tells react native to lock the screen orientation to portrait mode once the page is loaded
          const lockScreenOrientation = async () => {
                      await screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP);
                  };
                  lockScreenOrientation();// async function is called
          return () => { 
            screenOrientation.lockAsync(screenOrientation.OrientationLock.PORTRAIT_UP); 
      // tells react native to return the screen orientation to the default mode once the page is unloaded
          };
        }, []);

      const submit = async () => {// handles the submission of values to the database
        manualSave()
        alert("Preferences saved and ready to go! ⚙️👍")
        console.log(settings)
      };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formItemView}>
            <Text style={styles.title}>Settings Screen</Text>
        </View>
        <ScrollView style={styles.scrollView}>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your First name *</Text>
            <TextInput
            style={styles.textInput}
            placeholder="enter First Name"
            value={settings.FirstName}
            onChangeText={(text) => changeSetting('FirstName', text)}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your Last name *</Text>
            <TextInput 
            style={styles.textInput}
            placeholder="enter last Name"
            value={settings.LastName}
            onChangeText={(text) => changeSetting('LastName', text)}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Enter Your Date of Birth *</Text>
            <DateTimePicker 
            value={settings.dob ? new Date(settings.dob) : new Date()}
// this sets the date of birth to the selected birth or return the current date
            mode='date'
            display='default'
            onChange={(_, selectedDate) => {// handles the change of the date of birth to the selected date
                if (selectedDate) {
                    const date = (selectedDate.toISOString().split("T")[0]);
                    changeSetting('dob', date)
                };
            }}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>click on the button to Chose your favourite colour *</Text>
            <TouchableOpacity 
            style={[styles.functionButtons, { backgroundColor: settings.favouriteColour || '#fff' }]}
            onPress={() => setShowFavouriteColourButton(!showFavouriteColourButton)}// uses the specified state
            />
            {showFavouriteColourButton && (
                <View style={styles.buttonView}>
                    <ColorPicker 
                    swatches={false}
                    color={settings.favouriteColour}
                    onColorChange={(colour) => changeSetting('favouriteColour', colour)}
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
            step={1}
            style={styles.slider}
            value={settings.lightContrast}
            onValueChange={(value) => changeSetting('lightContrast', value)}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Flashing Lights</Text>
                <Switch
                style={styles.switch}
                value={settings.disableFlashingLights}
                onValueChange={(value) => changeSetting('disableFlashingLights', value)}
                />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Volume of White noise</Text>
            <Slider
            maximumValue={1}
            minimumValue={0}
            step={0.1}
            style={styles.slider}
            value={settings.backgroundWhiteNoise}
            onValueChange={(value) => changeSetting('backgroundWhiteNoise', value)}
            />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Light Intensity</Text>
            <Slider 
            maximumValue={100}
            minimumValue={0}
            step={1}
            style={styles.slider}
            value={settings.lightingIntensitySensitivity}
            onValueChange={(value) => changeSetting('lightingIntensitySensitivity', value)}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Soft Animation Style</Text>
                <Switch
                style={styles.switch}
                value={settings.animationStyle}
                onValueChange={(value) => changeSetting('animationStyle', value)}
                />
            </View>
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Sound Volume</Text>
            <Slider 
            maximumValue={1}
            minimumValue={0}
            step={0.1}
            style={styles.slider}
            value={settings.soundPreference}
            onValueChange={(value) => changeSetting('soundPreference', value)}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Visual Support</Text>
                <Switch
                style={styles.switch}
                value={settings.visionCondition}
                onValueChange={(value) => changeSetting('visionCondition', value)}
                />
            </View>
            
            <View style={styles.formItemView}>
            <Text style={styles.formHeaderText}>Choose a colour scheme</Text>
            <ColorPicker 
            style={styles.colourPicker}
            swatchesOnly = {true}
            color={settings.overallColourScheme}
            onColorChange={(value) => changeSetting('overallColourScheme', value)}
            />
            </View>
            <View style={styles.switchAndTextView}>
                <Text style={styles.formHeaderText}>Colour Blind effect</Text>
                <Switch
                style={styles.switch}
                value={settings.colourBlindEffect}
                onValueChange={(value) => changeSetting('colourBlindEffect', value)}
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
        marginLeft: width * 0.025,
    },
    textInput: {
        marginBottom: height * 0.03,
        backgroundColor: '#fff',
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
        marginLeft: width * 0.1
    },
    colourPicker: {
        marginBottom: height * 0.03,
        width: width * 0.8,
        marginTop: height * 0.02
    },
    title: {
        fontFamily: theme.FONTS.titleFontFamily,
        fontSize: theme.FONTS.titleFontSize,
        color: theme.COLOURS.quaternary,
        marginBottom: height * 0.02
    },
    formHeaderText: {
        fontFamily: theme.FONTS.normaltextFontFamily,
        color: theme.COLOURS.quaternary,
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
  },
  recommendedColourButton: {
    width : width * 0.1,
    height: height * 0.05,
    borderRadius: theme.BUTTONS.defaultButtonRadius * 100,
    borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
    marginHorizontal: width * 0.01,
    marginVertical: height * 0.01
  },
  recommendedButtonView: {
    flexDirection: 'row'
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLOURS.innerbackground
  },
  loadingText: {
    fontFamily: theme.FONTS.usernameFontFamily,
    fontSize: theme.FONTS.miniregularFontSize,
    color: theme.COLOURS.quaternary,
    marginTop: height * 0.02
  }
})