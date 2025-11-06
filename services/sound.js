import { Audio } from "expo-av";

export const playAppSound = async (soundFile) => {
// this function accepts a sound file as an argument and plays it when called
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
};

export const stopAppSound = async (soundObject) => {
// this function accepts a sound object as an argument and stops the sound when called
    await soundObject.stopAsync();
};

export const backgroundMusic = async (musicFile, shouldLoop = true) => {
// this function accepts a music file and a boolean value to determine if the music should loop
    const { sound } = await Audio.Sound.createAsync(musicFile, { shouldPlay: true, volume: 0 });
    await sound.setIsLoopingAsync(shouldLoop);
    await sound.playAsync();
    return sound; // returns the sound object to allow further control (e.g., stopping the music)
};