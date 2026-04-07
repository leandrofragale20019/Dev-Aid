import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Tool1 from "./pages/Tool1";
import Tool2 from "./pages/Tool2";
import Tool3 from "./pages/Tool3";
import AboutUs from "./pages/AboutUs";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool1" element={<Tool1 />} />
        <Route path="/tool2" element={<Tool2 />} />
        <Route path="/tool3" element={<Tool3 />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
