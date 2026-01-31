import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const Snail = () => {
    const animationRef = useRef(null);// default state is null
    
  return (
     <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/SNAIL LOADER.json')}
        autoPlay
        loop={true}
        style={styles.lottieView}
        />
    </View>
  )
}

export default Snail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottieView: {
        width: width * 0.5,
        height: height * 0.25,
        marginLeft: width * 0.5
    }
})