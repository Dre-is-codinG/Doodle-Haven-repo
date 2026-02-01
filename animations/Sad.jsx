import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const Sad = () => {
    const animationRef = useRef(null);// default state is null
  return (
    <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/Sad Face.json')}
        autoPlay
        loop={true}
        style={styles.lottieView}
        speed={0.7}
        />
    </View>
  )
}

export default Sad

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottieView: {
        width: width * 0.2,
        height: height * 0.5,
    }
})