import ProductItem from "../../components/product-item"
import { useFetch } from "../../hooks/use-fetch"
import { FetchProduct } from "../../type"

export default function ProductListPage(){

  const {loading, error, data} = useFetch<FetchProduct | null>(
    'https://dummyjson.com/products?limit=10&select=title,price,thumbnail'
  )
  

  if(loading) return <h1>Loading...</h1>

  if(error){
    return <h1>Error Occured.</h1>
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Product
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {
            data && data.products.length > 0 ? (
              data.products.map((product)=>(
                <ProductItem key={product.id} {...product}/>
              ))
            ) : (<div>No products</div>)
          }
        </div>
      </div>
    </section>
  )
}