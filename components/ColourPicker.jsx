import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { SafeAreaView } from 'react-native-safe-area-context';


const {height, width} = Dimensions.get('window')

const ColourPicker = ({ colour, setColour }) => {
    const [showButton, setShowButton] = useState(false);
    // this function would be used to create a state that determines if a button is visible

  return (
      <View>
        <TouchableOpacity
        style={[styles.functionButtons, { backgroundColor: colour }]}
        onPress={() => setShowButton(!showButton)}
        />
        {showButton && (
        <View style={styles.sectionContainer}>
          <ColorPicker
            color={colour}
            swatches={true}
            onColorChange={setColour}
            thumbSize={30}
            style={styles.colourPickerStyle}
          />
        </View>
        )}
        
      </View>
    );
  };

export default ColourPicker;

const styles = StyleSheet.create({
  sectionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    functionButtons: {
    width: width * 0.1,
    height: height * 0.2,
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: -(width * 0.05),
    marginVertical: -(height * 0.04),
  },
  colourPickerStyle: {
    top: -(height * 0.1),
    left: (width * 0.05),
    zIndex: 2000,
    position: 'absolute',
  }
  });