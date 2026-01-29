import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../config/theme';
import * as screenOrientation from 'expo-screen-orientation';
import { fetchChildReport } from '../services/guardianLogic';
import { auth } from '../lib/firebaseConfig';
import DrawingReport from '../components/drawingReport';
import { center } from '@shopify/react-native-skia';
import DonutReport from '../components/DonutReport';

const {height, width} = Dimensions.get('window')

const ReportScreen = () => {
    const [drawingReportData, setDrawingReportData] = useState([]);// defines report data state.
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const loadData = async () => {
            try {
                const childId = auth.currentUser.uid; // returns the id of the currently logged in child
                const data = await fetchChildReport(childId);
                setDrawingReportData(data || []);
            } finally {
                setLoading(false);
            }
            
        };

        loadData();
    }, []);// function would only be called once, when the screen mounts.
    
  return (
    <ImageBackground source={require('../assets/images/guardianBG.png')} style={styles.mainContainer}>
        <ScrollView>
            <View style={styles.titleView}>
                <Text style={styles.screenTitle}>Drawing Report</Text>
                
            </View>
            <View style={styles.graphView}>
                {loading ? (
                        <Text>Loading Chart...</Text> 
                    ) : drawingReportData.length > 0 ? (
                        <DrawingReport data={drawingReportData}/>
                    ) : (
                        <Text>No data available yet</Text>
                )}
            </View>
            <View style={styles.donutGraphView}>
                {loading ? (
                        <Text>Loading Chart...</Text> 
                    ) : drawingReportData.length > 0 ? (
                        <DonutReport data={drawingReportData}/>
                    ) : (
                        <Text>No data available yet</Text>
                )}
            </View>
            </ScrollView>
    </ImageBackground>
  )
}

export default ReportScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLOURS.background,
        alignItems: 'center',
    },
    titleView: {
        backgroundColor: theme.COLOURS.innerbackground,
        width: width * 0.9,
        height: height * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
        borderRadius: theme.BUTTONS.smoothButtonRadius,
        marginTop: height * 0.05,
        shadowColor: '#000',
        shadowOpacity: 0.6,
    },
    screenTitle: {
        fontSize: height * 0.05,
        color: '#000',
        fontFamily: theme.FONTS.buttontextFontFamily,
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        textAlign: 'center'
    },
    graphView: {
        width: width * 0.95,
        height: height * 0.3,
        backgroundColor: theme.COLOURS.innerbackground,
        marginVertical: height * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
        borderRadius: theme.BUTTONS.sharpButtonRadius,
    },
    donutGraphView: {
        width: width * 0.95,
        height: height * 0.5,
        backgroundColor: theme.COLOURS.innerbackground,
        marginVertical: height * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
        borderRadius: theme.BUTTONS.sharpButtonRadius,
    }
})