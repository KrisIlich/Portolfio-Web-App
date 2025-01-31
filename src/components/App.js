import '../assets/styles/App.css';
import React, { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate}  from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import LoginPage from './LoginPage';
import ChatBot from './ChatBot/ChatBot';
import HomePage from "./HomePage";


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/aichatbot" element={<ChatBot />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
