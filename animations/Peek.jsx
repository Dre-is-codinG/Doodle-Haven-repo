import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const Peek = () => {
    const animationRef = useRef(null);// default state is null
  return (
     <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/Cat Movement.json')}
        autoPlay
        loop={true}
        style={styles.lottieView}
        speed={0.4}
        />
    </View>
  )
}

export default Peek

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottieView: {
        width: width * 0.8,
        height: height * 0.4,
        position: 'absolute',
        bottom: height * -0.41,
        left: width * -0.1
    }
})