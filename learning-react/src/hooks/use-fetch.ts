import { useEffect, useState } from "react";

export function useFetch<T>(url: string){
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)
  const [data, setData] = useState<null | T>(null)

  async function makeRequest(_url: string){
    try{
      const data = await(await fetch(_url, {headers: {
        "Content-Type": "application/json",
      }})).json() as T
      setLoading(false)
      setData(data)
    }
    catch(e){
      setError(e as Error)
    }
    
  }

  useEffect(()=>{
    makeRequest(url)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {loading, error, data}
}