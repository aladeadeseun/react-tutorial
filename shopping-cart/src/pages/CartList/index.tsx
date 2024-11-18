import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import CartItem from "../../components/cart-item"
import { ShoppingCartContext } from "../../context"

export default function CartListPage(){

  const {cartItems} = useContext(ShoppingCartContext)

  //console.log(productInCart)

  const navigate = useNavigate()

  const goToProductPage = ()=>navigate("/products")

  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">My Cart Page</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {
            cartItems.length > 0 ? (
              cartItems.map(p=>(<CartItem {...p} key={p.id}/>))
            ) : (
              <h1>No Item in Cart</h1>
            )
          }
        </div>
        <div className="bg-gray-100 rounded-sm p-4 h-max">
          <h3 className="text-xl font-extrabold text-gray-950 border-b">Order Summary</h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            
          </ul>
          <p className="flex flex-wrap gap-4 text-sm font-bold">
            Total <span>${cartItems.reduce((prev, cartItem)=>{prev += cartItem.totalPrice;return prev}, 0).toFixed(2)}</span>
          </p>
          <div className="mt-5 flex gap-4">
            <button className="text-sm px-4 py-3 bg-black text-white font-extrabold disabled:opacity-65" disabled={cartItems.length === 0}>
              Checkout
            </button>
            <button className="text-sm px-4 py-3 bg-black text-white font-extrabold" onClick={goToProductPage}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}