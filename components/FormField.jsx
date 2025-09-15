import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { theme } from '../config/theme'
/* imports the theme object from the config directory to be used in the styling of the component*/

const {width, height} = Dimensions.get('window')


const FormField = ({  title, value, handleChangeText, keyboardType, placeholder, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
  return (
    <View style={styles.fieldview}>
      <Text style={styles.field}>{title}</Text>
      <View style={styles.formview}>
        <TextInput 
            style={styles.insideformtext}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.COLOURS.quaternary}
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            keyboardType={keyboardType}
        />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Text style={styles.showpasswordbuttontext}>
                    {!showPassword ? 'Show' : 'Hide'}
                </Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
const styles = StyleSheet.create({
    field: {
        paddingBottom: 10,
        fontSize: theme.FONTS.regularFontSize,
        color: theme.COLOURS.quinary,
        fontFamily: theme.FONTS.formTitleFontFamily

    },
    fieldview: {
        padding: 10,
        alignItems: "flex-start",
        paddingBottom: 30
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
    showpasswordbuttontext: {
        textAlign: "right",
        paddingRight: 5,
        alignItems: "center",
        color: theme.COLOURS.quaternary,
    },
    insideformtext: {
        fontSize: theme.FONTS.regularFontSize,
        textAlign: "justify-center",
        paddingTop: 10,
        fontFamily: theme.FONTS.usernameFontFamily,
        paddingLeft: 10,
        color: theme.COLOURS.quaternary,
    }
})