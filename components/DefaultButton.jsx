import { Text, TouchableOpacity, StyleSheet, Image, View, Dimensions } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'; //imports theme object from config directory.

const {height, width} = Dimensions.get('window')
/* 
Using the React Native Dimensions object, I am able to access the dimensions of the screen that is rendering the 
application. By retrieving these dimensions, I can ensure that the objects and components within the screen are
rendered appropriately to fit any screen of any size or type.
*/
const DefaultButton = ({ title, handlePress, textStyles, isLoading, buttonIcon }) => {
  return (
    <TouchableOpacity 
    style={[styles.buttonstyle]}
    onPress={handlePress}
    activeOpacity={0.5}
    >
        <View style={styles.buttonContent}>
            {buttonIcon && <Image source={buttonIcon} style={styles.buttonIconStyle}/>}
            <Text style={styles.buttontext}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default DefaultButton

const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: theme.COLOURS.primary,
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    borderColor: theme.BUTTONS.defaultButtonBorderColour,
    borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
    alignItems: "center",
    justifyContent: "center",
    width: theme.BUTTONS.defaultLargeButtonWidth,
    height: theme.BUTTONS.defaultLargeButtonHeight,
    paddingTop: 5,
    marginTop: 20,
    opacity: 0.9,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
  buttontext: {
    fontSize: theme.BUTTONS.defaultButtonFontSize,
    color: theme.BUTTONS.buttonTextColour,
    fontFamily: theme.BUTTONS.defaultButtonTextStyle
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIconStyle: {
    width: width * 0.1,
    height: height * 0.1,
    marginRight: 20,
    resizeMode: 'contain',
  }
})