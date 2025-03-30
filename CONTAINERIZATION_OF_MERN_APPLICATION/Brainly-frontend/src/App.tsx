import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Share } from "./pages/Share"
import { ToastContainer } from "react-toastify"
import { Home } from "./pages/Home"



function App() {
  
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareid" element={<Share />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
