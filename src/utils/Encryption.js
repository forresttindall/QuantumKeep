import CryptoJS from 'crypto-js';

const API_KEY = 'WBQ46y3WOI7NtXpnWQjwX6zbqYx3F0sXaqQ5S688';
const API_URL = 'https://api.quantumnumbers.anu.edu.au';

export const fetchQuantumData = async () => {
  try {
    // Request 48 uint16 numbers (16 bits each)
    // This will give us 96 hex chars after conversion (48 * 2)
    const response = await fetch(`${API_URL}?length=48&type=uint16`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Convert uint16 numbers to hex strings
    const hexString = data.data
      .map(num => num.toString(16).padStart(4, '0'))
      .join('');
    
    return {
      keyHex: hexString.slice(0, 64),  // First 64 chars for key (32 bytes)
      ivHex: hexString.slice(64, 96)   // Next 32 chars for IV (16 bytes)
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

    // Read file as ArrayBuffer
    const fileData = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(fileData);
    
    console.log('Encrypting file:', file.name, file.type); // Debug log
    
    // Encrypt with AES-256
    const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Create metadata object with file type and original name
    const metadata = {
      type: file.type || 'application/octet-stream',
      name: file.name,
      originalName: file.name // Store the original name explicitly
    };

    console.log('Encryption metadata:', metadata); // Debug log

    // Combine metadata and encrypted data
    const filePackage = {
      metadata: metadata,
      data: encrypted.toString()
    };

    // Convert to JSON and create Blob
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
