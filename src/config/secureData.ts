import CryptoJS from "crypto-js";

export const cipherData = (data: string) => {
  const encryptionKey = `${process.env.NEXTAUTH_TOKEN_KEY}`;
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
  return encryptedData;
};

export const decipherData = (data: string) => {
  const encryptionKey = `${process.env.NEXTAUTH_TOKEN_KEY}`;
  if (!data) return null;

  const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
