import CryptoJS from 'crypto-js';

export const decryptFile = async (file, encryptionKey, iv) => {
  try {
    // Read the encrypted file as JSON
    const fileText = await file.text();
    const filePackage = JSON.parse(fileText);
    
    // Extract metadata and encrypted data
    const { metadata, data } = filePackage;
    
    console.log('Decryption metadata:', metadata); // Debug log
    
    // Convert hex strings to WordArray
    const key = CryptoJS.enc.Hex.parse(encryptionKey);
    const ivParams = CryptoJS.enc.Hex.parse(iv);

    // Decrypt the file
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: ivParams,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Convert to bytes
    const decryptedBytes = new Uint8Array(
      decrypted.words.map(word => {
        const bytes = [];
        bytes.push((word >>> 24) & 0xFF);
        bytes.push((word >>> 16) & 0xFF);
        bytes.push((word >>> 8) & 0xFF);
        bytes.push(word & 0xFF);
        return bytes;
      }).flat()
    );

    // Remove padding bytes
    const paddingLength = decryptedBytes[decryptedBytes.length - 1];
    const unpaddedBytes = decryptedBytes.slice(0, decryptedBytes.length - paddingLength);

    // Determine the original file name
    let originalName;
    if (metadata && metadata.originalName) {
        originalName = metadata.originalName;
    } else if (metadata && metadata.name) {
        originalName = metadata.name;
    } else if (file.name) {
        originalName = file.name.replace('.encrypted', '');
    } else {
        originalName = 'decrypted_file';
    }

    console.log('Original name:', originalName); // Debug log
    console.log('File type:', metadata.type); // Debug log

    // Create Blob with original file type
    const decryptedBlob = new Blob([unpaddedBytes], { 
      type: metadata.type || 'application/octet-stream' 
    });
    
    // Create download URL
    const downloadUrl = URL.createObjectURL(decryptedBlob);

    // Return decrypted file info with original name
    return {
      url: downloadUrl,
      name: originalName,
      size: decryptedBlob.size
    };
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt file. Please check your encryption key.');
  }
};
