import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ShoppingCartContext } from "../../context"
import { useFetch } from "../../hooks/use-fetch"
import { Product } from "../../type"

export default function ProductDetails(){
  
  const {handleSetProductInCartHandler, cartItems} = useContext(ShoppingCartContext)

  const {id} = useParams<{id:string}>()

  const {loading, data, error} = useFetch<Product | null>(`https://dummyjson.com/products/${id}?select=title,price,thumbnail`)

  //console.log({loading, data, error})

  const navigate = useNavigate()

  const handleGoToCart = (product: Product)=>{
    handleSetProductInCartHandler(product)
    navigate("/cart")
  }

  if(loading){
    return <h1>Loading....</h1>
  }

  if(error){
    return <div>Error Occur While fetching data</div>
  }

  

  return (
    data ? (
    //   <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
    //   <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm">
    //     <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
    //       <div className="px-4 py-10 rounded-xl shadow-lg relative">
    //         <img src={data.thumbnail} alt={data.title} className="w-4/5 rounded object-cover"/>
    //       </div>
    //       <div className="mt-6 flex flex-wrap justify-center gap-6">

    //       </div>
    //     </div>
    //   </div>
    // </div>
      <div className="relative border border-cyan-700 p-6 cursor-pointer">
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          />
        </div>
        <div className="flex items-start justify-between mt-4 space-x-4">
          <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base" title={data.title}>
            <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{data.title}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">${data.price}</p>
          </div>
        </div>
        <button className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg disabled:opacity-60" onClick={()=>handleGoToCart(data)} disabled={cartItems.findIndex(c=>c.id ===data.id) > -1}>Add to Cart</button>
      </div>
    ) : (null)
    
  )
}