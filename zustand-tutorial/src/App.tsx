import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import RootLayout from "./layout/RootLayout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Product from "./pages/Product"

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="products" element={<Product/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  )
}

export default App
