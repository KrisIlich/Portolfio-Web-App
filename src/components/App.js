import '../assets/styles/App.css';
import { BrowserRouter, Routes, Route, Navigate}  from "react-router-dom";
import HomePage from "./HomePage";


function App() {

  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
