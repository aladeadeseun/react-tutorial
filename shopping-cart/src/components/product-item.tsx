import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCartContext } from "../context"

export default function ProductItem({title, thumbnail, price, id}:{title:string, thumbnail:string,price:number, id:number}){

  const navigate = useNavigate()

  const {handleSetProductInCartHandler, cartItems} = useContext(ShoppingCartContext)

  const getProdcutDetailOnClickHandler = (id:number)=>{
    //console.log(id)
    navigate(`/product-details/${id}`)
  }

  const handleAddToCart = ()=>{
    handleSetProductInCartHandler({title, thumbnail, price, id})
    navigate("/cart")
  }

  return (
    <div className="relative border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img 
          src={thumbnail} 
          alt={title} 
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base" title={title}>
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">{price}</p>
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row">
      
        <button className="px-2 mt-5 py-2 rounded-none bg-black text-white text-sm" onClick={()=>getProdcutDetailOnClickHandler(id)}>View Details</button>

        <button className="px-2 mt-5 py-2 rounded-none bg-black text-white text-sm disabled:opacity-60" onClick={handleAddToCart} disabled={cartItems.findIndex(c=>c.id === id) > -1}>Add To Cart</button>

      </div>
      
    </div>
  )
}