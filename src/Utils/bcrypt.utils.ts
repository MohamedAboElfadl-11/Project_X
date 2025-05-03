import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

// Encryption Function
export const encryption = (text: string, secretKey: string): string => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decryption Function
export const decryption = (text: string, secretKey: string): string => {
    const byte = CryptoJS.AES.decrypt(text, secretKey);
    return byte.toString(CryptoJS.enc.Utf8);
};

// Hashing Function
export const hashing = (text: string, salt: string | number): string => {
    return bcrypt.hashSync(text, salt);
};

// Comparing Function
export const comparing = async (text: string, textDB: string): Promise<boolean> => {
    return bcrypt.compare(text, textDB);
};
