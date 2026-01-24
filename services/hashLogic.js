import * as Crypto from "expo-crypto";

export const hashPasscode = async (passcode) => {
    return await Crypto.digestStringAsync(
// digest method allows the plain text passcode to be encrypted to fixed lenght cypher-text using SHA256 algorithm
        Crypto.CryptoDigestAlgorithm.SHA256,
        passcode
    );
};