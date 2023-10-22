import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import './App.scss'
import Home from './components/Home/Home'
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  
  return (
    <>
      <Router>
      <Routes>
     <Route path="" element={<Home />} />
     <Route path="/home" element={<Navigate to="/" />} />
     <Route path="*" element={<ErrorPage />} />
     </Routes>
      </Router>
     
    </>
  )
}

export default App
