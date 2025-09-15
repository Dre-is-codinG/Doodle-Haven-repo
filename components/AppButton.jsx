import { TouchableOpacity,Text, StyleSheet } from 'react-native'
import React from 'react'

const AppButton = ({ title, handlePress, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
    style={[styles.buttonstyle]}
    onPress={handlePress}
    activeOpacity={0.5}
    >
      <Text style={styles.buttontext}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: "#c7ab78",
    borderRadius: 15,
    alignItems: "center",
    textAlign: "justify-center",
    width: "100%",
    height: 50,
    paddingTop: 5,
  },
  buttontext: {
    fontSize: 30,
    textAlign: "center",
    color: "#4f370d"
  },
})