import { Route, Routes } from "react-router-dom"
import CartListPage from "./pages/CartList"
import ProductDetails from "./pages/productDetails"
import ProductListPage from "./pages/productList"

function App() {
 
  return (
    <>
      <Routes>
        <Route
          path="/products"
          element={<ProductListPage/>}
        />
        <Route
          path="/cart"
          element={<CartListPage/>}
        />
        <Route
          path="/product-details/:id"
          element={<ProductDetails/>}
        />
      </Routes>
    </>
  )
}

export default App
