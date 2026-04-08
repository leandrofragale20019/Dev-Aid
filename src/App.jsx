import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import JsonFormatter from "./tools/JsonFormatter";
import ColorPicker from "./tools/ColorPicker";
import RegexTesterValidater from "./tools/RegexTesterValidater"; 
import AboutUs from "./pages/AboutUs";          
import "./App.css";


function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jsonFormatter" element={<JsonFormatter />} />
        <Route path="/colorPicker" element={<ColorPicker />} />
        <Route path="/regex" element={<RegexTesterValidater />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
