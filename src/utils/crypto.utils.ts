import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY ?? 'infinity-secret-key';

export const encryptData = (data: unknown) => {
   return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (cipherText: string) => {
   const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
