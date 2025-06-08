import React, { useState, useCallback } from 'react';
import './style.css';

const VigenereCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');

  // 处理输入，只允许英文字母和空格
  const handleInput = (value) => {
    return value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
  };

  // 加密函数
  const encrypt = useCallback((text, key) => {
    if (!key) return text;
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        result += ' ';
        continue;
      }
      
      const keyChar = key[keyIndex % key.length];
      const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
      const charCode = char.charCodeAt(0);
      const encryptedChar = String.fromCharCode(
        ((charCode - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0)
      );
      
      result += encryptedChar;
      keyIndex++;
    }
    
    return result;
  }, []);

  // 解密函数
  const decrypt = useCallback((text, key) => {
    if (!key) return text;
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        result += ' ';
        continue;
      }
      
      const keyChar = key[keyIndex % key.length];
      const shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
      const charCode = char.charCodeAt(0);
      const decryptedChar = String.fromCharCode(
        ((charCode - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0)
      );
      
      result += decryptedChar;
      keyIndex++;
    }
    
    return result;
  }, []);

  // 处理明文变化
  const handlePlaintextChange = (e) => {
    const newPlaintext = handleInput(e.target.value);
    setPlaintext(newPlaintext);
    if (key) {
      setCiphertext(encrypt(newPlaintext, key));
    }
  };

  // 处理密文变化
  const handleCiphertextChange = (e) => {
    const newCiphertext = handleInput(e.target.value);
    setCiphertext(newCiphertext);
    if (key) {
      setPlaintext(decrypt(newCiphertext, key));
    }
  };

  // 处理密钥变化
  const handleKeyChange = (e) => {
    const newKey = handleInput(e.target.value);
    setKey(newKey);
    if (newKey) {
      setCiphertext(encrypt(plaintext, newKey));
    }
  };

  return (
    <div className="vigenere-cipher">
      <div className="cipher-card">
        <h2>维吉尼亚密码工具</h2>
        <div className="input-group">
          <label>明文</label>
          <textarea
            value={plaintext}
            onChange={handlePlaintextChange}
            placeholder="请输入明文（仅支持英文字母和空格）"
          />
        </div>
        <div className="input-group">
          <label>密钥</label>
          <input
            type="text"
            value={key}
            onChange={handleKeyChange}
            placeholder="请输入密钥（仅支持英文字母）"
          />
        </div>
        <div className="input-group">
          <label>密文</label>
          <textarea
            value={ciphertext}
            onChange={handleCiphertextChange}
            placeholder="请输入密文（仅支持英文字母和空格）"
          />
        </div>
      </div>
    </div>
  );
};

export default VigenereCipher; 