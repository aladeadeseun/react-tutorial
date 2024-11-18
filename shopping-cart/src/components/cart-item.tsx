import { useContext } from "react"
import { ShoppingCartContext } from "../context"
import { CartItem as CartItemType } from "../type"

export default function CartItem(
  {
    thumbnail, title, totalPrice, price, id, quantity
  }:CartItemType
){

  const {handleRemoveFromCart, handleSetProductInCartHandler} = useContext(ShoppingCartContext)

  return (
    <>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img src={thumbnail} alt={title} className="w-full h-full object-contain"/>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {title}
            </h3>
            <button className="text-sm px-4 py-3 bg-red-700 text-white font-extrabold" onClick={()=>handleRemoveFromCart({id, price}, true)}>REMOVE</button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </h3>
          <p className="text-sm font-bold text-gray-900">Quantity: {quantity}</p>
          <div className="mt-3">
            <button className="border border-[#000]" onClick={()=>handleRemoveFromCart({id, price}, false)} disabled={quantity <= 1}>-</button>
            <button className="border border-[#000]" onClick={() => handleSetProductInCartHandler({id, price, title, thumbnail})}>+</button>
          </div>
          
        </div>
      </div>
      <hr className="border-gray-500"/>
    </>
  )
}