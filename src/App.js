import './App.css';
import React, { useState, useEffect } from 'react';
import Store from './components/Store'
import Bakery from './components/Bakery';

function App() {


  const initialCookie = 0;
  const initialCookiePerSecond = 0;

  const [cookie, setCookie] = useState(initialCookie);
  const [cookiePerSecond, setCookiePerSecond] = useState(initialCookiePerSecond);

  const handleIncrementCookie = () => {
    setCookie(cookie + 1);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCookie((prevCookie) => prevCookie + cookiePerSecond);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [cookiePerSecond]);


  return (
    <div className="App">
      <Bakery onClick={handleIncrementCookie} />
      <Store cookie={cookie} cookiePerSecond={cookiePerSecond} setCookie={setCookie} setCookiePerSecond={setCookiePerSecond} />
    </div>
  );
}

export default App;
