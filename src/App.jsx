import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tool1 from "./pages/Tool1";
import Tool2 from "./pages/Tool2";
import Tool3 from "./pages/Tool3";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tool1" element={<Tool1 />} />
      <Route path="/tool2" element={<Tool2 />} />
      <Route path="/tool3" element={<Tool3 />} />
    </Routes>
  );
}

export default App;
