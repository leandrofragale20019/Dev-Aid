import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import JsonFormatter from "./pages/JsonFormatter";
import ColorPicker from "./pages/ColorPicker";
import Tool3 from "./pages/Tool3";
import AboutUs from "./pages/AboutUs";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jsonFormatter" element={<JsonFormatter />} />
        <Route path="/colorPicker" element={<ColorPicker />} />
        <Route path="/tool3" element={<Tool3 />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;