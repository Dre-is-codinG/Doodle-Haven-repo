import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const LoaderCatAnim = () => {
    const animationRef = useRef(null);// default state is null

  return (
    <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/Loader cat.json')}
        autoPlay
        loop={true}
        style={styles.lottieView}
        />
    </View>
  )
}

export default LoaderCatAnim

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottieView: {
        width: width * 0.8,
        height: height * 0.5
    }
})