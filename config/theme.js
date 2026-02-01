import { sub } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window')

export const theme = {
    COLOURS: {
//default colour themes that would be adopted in the application
        primary: '#ddc9ae',
        primaryFaint:'#ddc9aeb4',
        secondary: '#C0A08A',
        secondaryFaint: '#c0a08a88',
        tertiary: '#A48573',
        tertiaryFaint: '#a485737e',
        quaternary: '#795b4aff',
        quaternaryFaint: 'rgba(121, 91, 74, 0.29)',
        quinary: '#583f148c',
        quinaryFaint: '#583f1446',
        background: '#f5e2c7',
        backgroundFaint: '#f5e2c796',
        innerbackground: '#dcc19b41',
    },
    BUTTONS: {
// default button themes that would be adopted in the application
        defaultButtonRadius: 30,
        sharpButtonRadius: 20,
        smoothButtonRadius: 50,
        softButtonShadow: '#a3a3a3ff',
        defaultButtonBackground: '#efd9afff',
        defaultButtonBorderWidth: 4,
        defaultButtonBorderColour: '#715240ff',
        defaultLargeButtonWidth: width * 0.9,
        defaultLargeButtonHeight: height * 0.1,
        defaultButtonTextStyle: 'ComicMono-Bold',
        defaultButtonFontSize: width * 0.11,

// default button texts that would be adopted in the application
        buttonTextColour: '#83624fff',
        buttonTextWeight: 700,
    },
    FONTS: {
// default font themes that would be adopted in the application
        titleFontFamily: 'ComicSansMS',
        subTitleFontFamily: 'PatrickHand-Regular',
        normaltextFontFamily: 'ClassicComic',
        buttontextFontFamily: 'ComicSansMS',
        formTitleFontFamily: 'ComicMono',
        usernameFontFamily: 'Schoolbell-Regular',

// default font sizes that would be adopted in the application
        supertitleFontSize: width * 0.18,
        titleFontSize: width * 0.08,
        subtitleFontSize: width * 0.075,
        regularFontSize: width * 0.06,
        miniregularFontSize: width * 0.05,
    }
};

