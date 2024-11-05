import Camera from "./components/camera";
import ResultPage from "./components/result-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Camera />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
