import { createRoot } from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'
// import App from './App.tsx'
import "./index.css"
//import NestedRoutes from './NestedRoutes.tsx'
import RouteLoader from './RouteLoader.tsx'

createRoot(document.getElementById('root')!).render(
  //this will be use for app3.tsx
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  
    // <App/>
    // <NestedRoutes/>
  <RouteLoader/>
  
)
