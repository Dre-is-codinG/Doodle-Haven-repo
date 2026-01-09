import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg';
import React from 'react';
import { theme } from '../config/theme';

const {height, width} = Dimensions.get('window')

/* 
this function would take the "paths" parameter where it would store the paths that would be fetched
from the firestore database for the appropriate user
*/
const ImagePreview = ({ paths }) => {
  return (
    <View style={styles.imagePreviewView}>
     <Svg viewBox='50 10 500 450' style={styles.svgStyling}> 
        {(paths || []).map((p, index) => (
            <Path
                key={index}
                d={p.path.join(" ")}
                stroke={p.color || "black"}
                strokeWidth={p.strokeWidth || 10}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        ))}
     </Svg>
    </View>
  );
};

export default ImagePreview

const styles = StyleSheet.create({
    imagePreviewView: {
        height: height * 0.25,
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: theme.BUTTONS.sharpButtonRadius,
        borderWidth: theme.BUTTONS.defaultButtonBorderWidth,
        overflow: 'hidden',
        marginVertical: height * 0.01,
    },
    svgStyling: {
        width: '100%',
        height: '125%',
        flex: 1
    },
})