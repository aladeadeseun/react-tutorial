import { useEffect, useState } from "react"

export function useFetch<T>(url:string){
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(function(){
    
    const controller = new AbortController()

    async function makeRequest(){
      //initialize
      setLoading(true)
      setError(null)
      //setData(null
      

      try{
        
        const res = await fetch(url, {signal:controller.signal})
        
        if(res.ok) {
          setData(await res.json())
        }else{
          setError(new Error(res.statusText))
        }
      }
      finally{
        setLoading(false)
      }
    }
    makeRequest()

    return function cleanup(){
      controller.abort()
    }
  }, [url])

  return {loading, data, error}
}