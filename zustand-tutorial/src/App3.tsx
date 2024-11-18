import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"

import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Product from "./pages/Product"

function App() {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Product/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
