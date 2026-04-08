import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import JsonFormatter from "./pages/JsonFormatter";
import ColorPicker from "./pages/ColorPicker";
import RegexTesterValidater from "./pages/RegexTesterValidater";
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
