import React from "react";
import { Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { theme } from "../config/theme";

const {height, width} = Dimensions.get('window')
const DrawingReport = ({ data }) => {
    const happyLine = data.map(d => (d.emotion === "happy" ? 1 : 0));// happy line encoding
    const sadLine = data.map(d => (d.emotion === "sad" ? 1 : 0));// sad line encoding

    return (
        <LineChart
        data={{
            labels: data.map((_, i) => (i % 3 === 0 ? `${i + 1}` : "")),
            datasets: [
            { data: happyLine, color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, strokeWidth: 3 },
            { data: sadLine, color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`, strokeWidth: 2 },
            ],
        }}
        width={width * 0.9} 
        height={height * 0.25}
        bezier={false} 
        withInnerLines={false} 
        withOuterLines={false}
        withHorizontalLabels={false}
        chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: theme.COLOURS.innerbackground,
            backgroundGradientTo: theme.COLOURS.innerbackground,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
            propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: "#fff" 
            }
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16,
        }}
    />
    );
    };
export default DrawingReport;

