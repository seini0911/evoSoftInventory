import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
