import React, { useState } from 'react';
import './Store.css';

const Bakery = ({ onClick }) => {
  const [storeName, setStoreName] = useState("Burak's bakery"); // Başlangıçta Burak's bakery olarak ayarlanmış isim
  const handleStoreNameClick = () => {
    const newName = prompt('Enter a new bakery name:');
    if (newName) {
      setStoreName(newName);
    }
  };


  return (
    <div>
      <button className='produce-button' onClick={onClick}>Produce Cookie</button>
      <p className='store-name' onClick={handleStoreNameClick}>
        {storeName} 
      </p>
    </div>
  );
};

export default Bakery;
