// App.js
import React, { useState } from 'react';
import '../assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SplashScreen from './SplashScreen/SplashScreen';

function App() {
  // State to control splash display
  const [showSplash, setShowSplash] = useState(true);
  // A key for HomePage to force a re-mount when needed
  const [contentKey, setContentKey] = useState(0);

  // Called when the splash finishes on initial load
  const handleSplashFinish = () => {
    setShowSplash(false);
    // Force HomePage re-mount by changing its key
    setContentKey((prev) => prev + 1);
  };

  // This function can be called from HomePage (e.g., after a modal close)
  // It re-triggers the splash screen for 3 seconds, then forces a re-mount.
  const triggerSplash = () => {
    setShowSplash(true);
    setTimeout(() => {
      handleSplashFinish();
    }, 1000);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        {!showSplash && (
          <Routes>
            <Route path="/" element={<HomePage key={contentKey} triggerSplash={triggerSplash} />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;