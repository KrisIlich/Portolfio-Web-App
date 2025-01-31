import '../assets/styles/App.css';
import { BrowserRouter, Routes, Route, Navigate}  from "react-router-dom";
import LoginPage from './LoginPage';
import ChatBot from './ChatBot/ChatBot';
import HomePage from "./HomePage";


function App() {

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
