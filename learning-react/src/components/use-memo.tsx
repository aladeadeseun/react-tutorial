import { useMemo, useState } from "react"
import { useFetch } from "../hooks/use-fetch"

type Product = {
  price: number,
  id:number
}

function filterProductByPrice(products: Product[]){
  console.log("filter called")
  return products.filter(p=>(p.price > 10))
}

export default function UseMemo(){
  const {loading, error, data} = useFetch<{products:Product[]}>("https://dummyjson.com/products/?limit=10")

  const [flag, toggleFlag] = useState(false)

  const handleToggleFlag = ()=>{
    toggleFlag(f=>!f)
  }

  const memorizedVersion = useMemo(()=>filterProductByPrice((data ? data.products : [])), [data])

  //console.log({loading, error, data})

  if(loading) return <h1>Loading...</h1>

  return (
    <div>
      {
        error ? (
          <h3>Errored</h3>
        ) : (
          <>
          <h1 style={{color:(flag ? 'red':"black")}}>Use Memo</h1>
          <button onClick={handleToggleFlag}>Toggle Flag</button>
            {
              data && data.products ? (
                <ul>
                  {
                    memorizedVersion.map(p=>(<li key={p.id}>{p.price}</li>))
                  }
                </ul>
              ) : (
                <h1>Unable to fetch</h1>
              )
              
            }
          </>
        )
      }
      
    </div>
  )
}