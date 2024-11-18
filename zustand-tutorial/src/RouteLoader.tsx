import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import ContactForm from "./components/ContactForm"
import ContactInfo from "./components/ContactInfo"
import Error from "./components/Error"
import JobDetails from "./components/JobDetails"
import NotFound from "./components/NotFound"
import ContactLayout from "./layout/ContactLayout"
import JobsLayout from "./layout/JobsLayout"
import RootLayout from "./layout/RootLayout"
import About from "./pages/About"
import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import Product from "./pages/Product"

function RouteLoader() {
  
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
        <Route path="jobs" element={<JobsLayout/>}>
          <Route index element={<Jobs/>}/>
          <Route path=":id" element={<JobDetails/>} errorElement={<Error/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    ),
    {
      future:{v7_fetcherPersist: true,}
    }
  )

  return (
    <RouterProvider router={router}
      future={{
        v7_startTransition: true,
        
      }}
    />
  )
}

export default RouteLoader
