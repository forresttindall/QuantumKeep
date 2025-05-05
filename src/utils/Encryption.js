import CryptoJS from 'crypto-js';


const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;


console.log("API URL being used:", API_URL);
console.log("API Key available:", API_KEY ? "Yes (length: " + API_KEY.length + ")" : "No");

export const fetchQuantumData = async () => {
  try {
    const response = await fetch(`${API_URL}?length=48&type=uint16`, {
      headers: {
        'x-api-key': API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();


    const hexString = data.data
      .map(num => num.toString(16).padStart(4, '0'))
      .join('');

    return {
      keyHex: hexString.slice(0, 64), // First 64 chars (32 bytes)
      ivHex: hexString.slice(64, 96)  // Next 32 chars (16 bytes)
    };
  } catch (error) {
    console.error('Quantum API Error:', error);
    throw new Error('Failed to fetch quantum data: ' + error.message);
  }
};

export const encryptFile = async (file) => {
  try {
    const { keyHex, ivHex } = await fetchQuantumData();
    const key = CryptoJS.enc.Hex.parse(keyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const fileData = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(fileData);

    console.log('Encrypting file:', file.name, file.type);

    const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const metadata = {
      type: file.type || 'application/octet-stream',
      name: file.name,
      originalName: file.name
    };

    const filePackage = {
      metadata: metadata,
      data: encrypted.toString()
    };

    const encryptedBlob = new Blob([JSON.stringify(filePackage)], {
      type: 'application/json'
    });

    const downloadUrl = URL.createObjectURL(encryptedBlob);

    return {
      encryptedFile: {
        url: downloadUrl,
        name: `${file.name}.encrypted`,
        size: encryptedBlob.size
      },
      encryptionKey: keyHex + ivHex
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};
 