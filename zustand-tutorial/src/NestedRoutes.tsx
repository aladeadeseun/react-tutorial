import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import ContactForm from "./components/ContactForm"
import ContactInfo from "./components/ContactInfo"
import NotFound from "./components/NotFound"
import ContactLayout from "./layout/ContactLayout"
import RootLayout from "./layout/RootLayout"
import About from "./pages/About"
import Home from "./pages/Home"
import Product from "./pages/Product"

function NestedRoutes() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="products" element={<Product/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<ContactLayout/>}>
          {/* Add Nested Route */}
          <Route path="info" element={<ContactInfo/>}/>
          <Route path="form" element={<ContactForm/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
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

export default NestedRoutes
