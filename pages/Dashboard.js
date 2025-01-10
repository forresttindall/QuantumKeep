import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { encryptFile } from '../utils/Encryption';
import { decryptFile } from '../utils/Decryption';
import './Dashboard.css';
import { 
  FaFile, 
  FaLock, 
  FaUnlock, 
  FaCopy, 
  FaTimes, 
  FaDownload, 
  FaUpload,
  FaFileAlt,
  FaSync
} from 'react-icons/fa';

const Dashboard = () => {
  const [localFiles, setLocalFiles] = useState([]);
  const [sendFiles, setSendFiles] = useState([]);
  const [decryptFiles, setDecryptFiles] = useState([]);
  const [encryptionProgress, setEncryptionProgress] = useState({});
  const [encryptionStatus, setEncryptionStatus] = useState({});
  const [decryptionKeys, setDecryptionKeys] = useState({});
  const [decryptionProgress, setDecryptionProgress] = useState({});

  const onDropLocal = (acceptedFiles) => {
    setLocalFiles(
      acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
      }))
    );
  };

  const onDropSend = (acceptedFiles) => {
    setSendFiles(
      acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
      }))
    );
  };

  const onDropDecrypt = (acceptedFiles) => {
    setDecryptFiles(
      acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
      }))
    );
  };

  const getEncryptionMessage = (progress) => {
    if (progress < 20) return "Sourcing zero-point energy...";
    if (progress < 40) return "Initializing quantum state...";
    if (progress < 60) return "Entangling encryption keys...";
    if (progress < 80) return "Applying quantum encryption...";
    return "Finalizing secure state...";
  };

  const handleEncrypt = async (file, fileId) => {
    try {
      setEncryptionProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Start progress animation
      const progressInterval = setInterval(() => {
        setEncryptionProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          return { 
            ...prev, 
            [fileId]: Math.min(currentProgress + 1, 90) 
          };
        });
      }, 100);

      // Encrypt the file
      const result = await encryptFile(file.file);

      // Update file state with encrypted file info
      setLocalFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === fileId
            ? {
                ...f,
                encrypted: true,
                encryptionKey: result.encryptionKey,
                downloadUrl: result.encryptedFile.url,
                encryptedName: result.encryptedFile.name,
                encryptedSize: result.encryptedFile.size
              }
            : f
        )
      );

      // Complete progress
      clearInterval(progressInterval);
      setEncryptionProgress(prev => ({ ...prev, [fileId]: 100 }));

      // Clear progress after a delay
      setTimeout(() => {
        setEncryptionProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }, 1000);

    } catch (error) {
      console.error('Encryption failed:', error);
      alert(`Encryption failed: ${error.message}`);
      setEncryptionProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  const removeDecryptFile = (id) => {
    setDecryptFiles(files => files.filter(f => f.id !== id));
    setDecryptionKeys(prev => {
      const newKeys = { ...prev };
      delete newKeys[id];
      return newKeys;
    });
    setDecryptionProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const handleDecrypt = async (file, fileId) => {
    try {
      const key = decryptionKeys[fileId];
      if (!key) {
        throw new Error('Please enter an encryption key');
      }

      // Extract key and IV from the full key string
      const keyHex = key.slice(0, 64);
      const ivHex = key.slice(64, 96);

      setDecryptionProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Start progress animation
      const progressInterval = setInterval(() => {
        setDecryptionProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          return { 
            ...prev, 
            [fileId]: Math.min(currentProgress + 1, 90) 
          };
        });
      }, 100);

      // Decrypt the file
      const result = await decryptFile(file.file, keyHex, ivHex);
      console.log('Decryption result:', result); // Debug log

      // Update file state with decrypted file info
      setDecryptFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === fileId
            ? {
                ...f,
                decrypted: true,
                downloadUrl: result.url,
                decryptedName: result.name, // Store the decrypted name
                decryptedSize: result.size
              }
            : f
        )
      );

      // Complete progress
      clearInterval(progressInterval);
      setDecryptionProgress(prev => ({ ...prev, [fileId]: 100 }));

      // Clear progress after a delay
      setTimeout(() => {
        setDecryptionProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }, 1000);

    } catch (error) {
      console.error('Decryption failed:', error);
      alert(error.message);
      setDecryptionProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  // Update the download handler
  const handleDownload = (file) => {
    if (file.downloadUrl) {
      const link = document.createElement('a');
      link.href = file.downloadUrl;
      // For encrypted files, keep the .encrypted extension
      // For decrypted files, use the original name
      link.download = file.decrypted 
        ? file.decryptedName 
        : `${file.name}.encrypted`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const removeFile = (id, isLocal = true) => {
    if (isLocal) {
      setLocalFiles(files => files.filter(f => f.id !== id));
    } else {
      setSendFiles(files => files.filter(f => f.id !== id));
    }
    // Clear any progress state
    setEncryptionProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const clearDropzone = (isLocal = true) => {
    if (isLocal) {
      setLocalFiles([]);
    } else {
      setSendFiles([]);
    }
  };

  const {
    getRootProps: getLocalRootProps,
    getInputProps: getLocalInputProps,
    isDragActive: isLocalDragActive,
  } = useDropzone({
    onDrop: onDropLocal,
    multiple: false,
  });

  const {
    getRootProps: getSendRootProps,
    getInputProps: getSendInputProps,
    isDragActive: isSendDragActive,
  } = useDropzone({
    onDrop: onDropSend,
    multiple: false,
  });

  const {
    getRootProps: getDecryptRootProps,
    getInputProps: getDecryptInputProps,
    isDragActive: isDecryptDragActive,
  } = useDropzone({
    onDrop: onDropDecrypt,
    multiple: false,
  });

  // Update the file item render
  const renderFileItem = (file) => (
    <div key={file.id} className="file-item">
      <FaFile className="file-icon" />
      <span>{file.name}</span>
      <div className="file-actions">
        {file.encrypted ? (
          <>
            <span className="encryption-status">Encrypted</span>
            <button
              className="download-button"
              onClick={() => handleDownload(file)}
            >
              <FaDownload />
              Download
            </button>
            <div className="encryption-key-container">
              <span className="key-label">Encryption Key</span>
              <div className="encryption-key">
                {file.encryptionKey}
              </div>
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(file.encryptionKey);
                  // Optional: You could add a tooltip or notification here
                }}
                title="Copy key"
              >
                <FaCopy />
              </button>
            </div>
          </>
        ) : (
          <button
            className="encrypt-button"
            onClick={() => handleEncrypt(file, file.id)}
            disabled={encryptionProgress[file.id] !== undefined}
          >
            <FaLock />
            Encrypt
          </button>
        )}
        <button
          className="remove-button"
          onClick={() => removeFile(file.id)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );

  // Update the decrypt file section render
  const renderDecryptFileItem = (file) => (
    <div key={file.id} className="file-item">
      <FaFile className="file-icon" />
      <span>{file.decrypted ? file.decryptedName : file.name}</span>
      <div className="file-actions">
        {file.decrypted ? (
          <>
            <span className="decryption-status">Decrypted</span>
            <button
              className="download-button"
              onClick={() => handleDownload(file)}
            >
              <FaDownload />
              Download {file.decryptedName}
            </button>
          </>
        ) : (
          <>
            <div className="encryption-key-container">
              <span className="key-label">Encryption Key</span>
              <input 
                type="text" 
                className="encryption-key-input"
                placeholder="Paste your encryption key here"
                onChange={(e) => setDecryptionKeys(prev => ({
                  ...prev,
                  [file.id]: e.target.value
                }))}
                value={decryptionKeys[file.id] || ''}
              />
            </div>
            <button 
              className="decrypt-button"
              onClick={() => handleDecrypt(file, file.id)}
              disabled={decryptionProgress[file.id] !== undefined}
            >
              <FaUnlock />
              Decrypt
            </button>
          </>
        )}
        <button
          className="remove-button"
          onClick={() => removeDecryptFile(file.id)}
        >
          <FaTimes />
        </button>
        {decryptionProgress[file.id] !== undefined && (
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{width: `${decryptionProgress[file.id]}%`}}
            ></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dropzone-grid">
          {/* Decrypt Zone - Now First */}
          <div className="dropzone-section">
            <div className="section-header">
              <FaUnlock />
              <h2>Decryption</h2>
            </div>
            <p className="section-description">
              Decrypt your files<br />
              Using your key<br />
              Quantum secured
            </p>
            {decryptFiles.length === 0 ? (
              <div
                {...getDecryptRootProps()}
                className={`dropzone ${isDecryptDragActive ? 'active' : ''}`}
              >
                <input {...getDecryptInputProps()} />
                <div className="dropzone-content">
                  <FaFileAlt className="dropzone-icon" />
                  <p>Drop encrypted file</p>
                </div>
              </div>
            ) : (
              <div className="file-list">
                {decryptFiles.map(file => renderDecryptFileItem(file))}
                <button
                  className="clear-button"
                  onClick={() => clearDropzone('decrypt')}
                >
                  <FaSync />
                  Select Different File
                </button>
              </div>
            )}
          </div>

          {/* Local Encryption Zone - Now Second */}
          <div className="dropzone-section">
            <div className="section-header">
              <FaLock />
              <h2>Encryption</h2>
            </div>
            <p className="section-description">
              Encrypt files locally<br />
              No data stored<br />
              With quantum encryption
            </p>
            {localFiles.length === 0 ? (
              <div
                {...getLocalRootProps()}
                className={`dropzone ${isLocalDragActive ? 'active' : ''}`}
              >
                <input {...getLocalInputProps()} />
                <div className="dropzone-content">
                  <FaUpload className="dropzone-icon" />
                  <p>Drop to encrypt</p>
                </div>
              </div>
            ) : (
              <div className="file-list">
                {localFiles.map((file) => renderFileItem(file))}
                <button
                  className="clear-button"
                  onClick={() => clearDropzone(true)}
                >
                  <FaSync />
                  Select Different File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
