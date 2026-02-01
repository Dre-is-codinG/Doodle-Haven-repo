import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const Paint = () => {
    const animationRef = useRef(null);// default state is null
  return (
     <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/Painting.json')}
        autoPlay
        loop={false}
        style={styles.lottieView}
        />
    </View>
  )
}

export default Paint

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
        top: height * -0.065
    }
})