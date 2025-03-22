import CryptoJS from "crypto-js";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export function decrypt(data) {
    // console.log("Encrypted Data:", data);

    try {
        const bytes = CryptoJS.AES.decrypt(data, JWT_SECRET);
        // console.log(bytes)
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(decryptedData)

        if (!decryptedData) throw new Error("Decryption failed");

        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null; // Handle decryption failure gracefully
    }
}
