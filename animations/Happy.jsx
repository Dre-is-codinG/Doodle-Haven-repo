import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

const {height, width} = Dimensions.get('window')
const Happy = () => {
    const animationRef = useRef(null);// default state is null
  return (
    <View style={styles.container}>
        <LottieView 
        ref={animationRef}
        source={require('../assets/animations/Happy me.json')}
        autoPlay
        loop={true}
        style={styles.lottieView}
        speed={0.7}
        />
    </View>
  )
}

export default Happy

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottieView: {
        width: width * 0.5,
        height: height * 0.5,
    }
})