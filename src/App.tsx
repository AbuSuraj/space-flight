
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.scss'
import Home from './components/Home/Home'

function App() {
  
  return (
    <>
      <Router>
      <Routes>
     <Route path="" element={<Home />} />
     <Route path="/home" element={<Home />} />
     </Routes>
      </Router>
     
    </>
  )
}

export default App
