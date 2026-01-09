import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { theme } from '../config/theme'

const {height, width} = Dimensions.get('window')

const HamburgerButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Image source={require('../assets/images/menus.png')} style={styles.imageStyle}/>
    </TouchableOpacity>
  )
}

export default HamburgerButton

const styles = StyleSheet.create({
    buttonStyle:{
        width: width * 0.1,
        height: height * 0.1,
        resizeMode: 'contain',
        position: 'absolute',
        zIndex: 999,
        top: 20,
        left: 2
    },
    imageStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})