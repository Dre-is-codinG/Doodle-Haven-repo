import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { theme } from '../config/theme';
import React from 'react'
import Sad from '../animations/Sad';
import Happy from '../animations/Happy';
import { useState, useEffect } from 'react';


const {height, width} = Dimensions.get('window')
const DonutReport = ({ data }) => {
  const[activeAnimation, setActiveAnimation] = useState(null);
  // this defines the current active animation

  useEffect(() => {
    if (emotion === "happy") {
      setActiveAnimation("happy");
    } else if (emotion === "sad") {
      setActiveAnimation("sad");
    } else {
      setActiveAnimation(null);
    }
  }, [emotion]);
    
    if (!data || data.length === 0) {
        return <Text style={styles.emptyText}>The child has made no drawings yet...</Text>
    }

    const happyCount = data.filter(d => d.emotion === "happy").length;// counts the total number of happy drawings
    const sadCount = data.filter(d => d.emotion === "sad").length;// counts the total number of sad drawings

    let emotion = "neutral"
    let Anim = null
    if (happyCount > sadCount) emotion = "happy", Anim = "happy";
    else if (sadCount > happyCount) emotion = "sad", Anim = "Sad";

    const emotionImages = {
        happy: require('../assets/images/happyDoodle.png'),
        sad: require('../assets/images/sadDoodle.png'),
        neutral: require('../assets/images/neutral.png')
    }

     const chartData = [// data to populate chart.
    {
      name: "Happy",
      population: happyCount,
      color: "#A9F4D0",
      legendFontColor: "#444",
      legendFontSize: theme.FONTS.miniregularFontSize,
    },
    {
      name: "Sad",
      population: sadCount,
      color: "#D0E8FF",
      legendFontColor: "#444",
      legendFontSize: theme.FONTS.miniregularFontSize,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Emotional Distribution of drawing</Text>

      <PieChart
        data={chartData}
        width={width * 0.9}
        height={height * 0.25}
        chartConfig={{
          color: () => "#000",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft={width * 0.025}
        center={[0, 0]}
        absolute
        hasLegend
      />
      <View style={styles.circle}></View>
      <View style={styles.animationOverlay}>
        <View style={styles.radiustestview}>
          {activeAnimation === "sad" && <Sad />}
          {activeAnimation === "happy" && <Happy />}
        </View>
      </View>
    </View>
  )
}

export default DonutReport

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * -0.1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
        color: "#333",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    centerLabel: {
        position: "absolute",
        top: height * 0.1,
        alignItems: "center",
    },
    emptyText: {
        marginTop: 40,
        fontSize: 14,
        color: "#999",
    },
    circle: {
        backgroundColor: '#dcc19bd5',
        borderRadius: 100,
        width: width * 0.222,
        height: height * 0.1,
        position: 'absolute',
        top: height * 0.110,
        left: width * 0.14

    },
    animationOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1500,
      top: height * 0.4
    },
radiustestview: {
    marginTop: height * 0.1,
    width: width * 0.5,
    height: height * 0.25,
    backgroundColor: '#ddc9ae3c',
    borderRadius: theme.BUTTONS.smoothButtonRadius,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: theme.BUTTONS.softButtonShadow,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: height * 0.2,
    marginLeft: width * 0.5
  },
})