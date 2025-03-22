import CryptoJS from "crypto-js";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export function encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), JWT_SECRET).toString();
}
