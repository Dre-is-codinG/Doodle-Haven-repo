import { TouchableOpacity,Text, StyleSheet } from 'react-native'
import React from 'react'


const ListButton = ({title, handlePress, textStyles, isLoading, extraStyles}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    style={styles.buttonStyle}
    activeOpacity={0.1}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ListButton

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: '100%',
        height: 44,
        margin: 0.5
    },
    buttonText: {
        fontSize: 20
    }
})