import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

type Fruit = {id:string,name:string}

function fetchFruit(pageId: number){
  return axios.get<{data:Fruit[]}>(`http://localhost:4000/fruits?_page=${pageId}&_per_page=5`)
}

export default function PaginatedQueries(){

  const [page, setPage] = useState(2)

  const {data, isLoading, isError, error, } = useQuery({
    queryKey:["fruits", page],
    //this query must always return a promise
    queryFn:()=>fetchFruit(page),
    //Previous data will be retained until new data comes in
    placeholderData:keepPreviousData
  })


  if(isLoading) return (<h1>Loading...</h1>)
    
  if(isError) return (<h1>{error.message}</h1>)

    console.log(page)

  return(
    <div>
      {
        data && data.data && data.data.data.length ? (
          <>
          {
            data.data.data.map(f=>(
              <div key={f.id} className="post-item">
                <h3 className="post-title">{f.name}</h3>
              </div>
            ))
          }
          <button onClick={()=>setPage(p=>(p - 1))} disabled={page <= 1}>Prev Page</button>
          <button onClick={()=>setPage(p=>(p+1))} disabled={page >= 4}>Next Page</button>
          </>
        ) : (<h2>No Fruit(s)</h2>)
      }
    </div>
  )
}