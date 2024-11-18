import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

type Fruit = {id:string,name:string}

function fetchFruit({ pageParam } : { pageParam:number }){
  return axios.get<{data:Fruit[]}>(`http://localhost:4000/fruits?_page=${pageParam}&_per_page=5`)
}

export default function InfiniteScrolling(){


  const {data, isLoading, isError, error, } = useInfiniteQuery({
    queryKey:["fruits"],
    //this query must always return a promise
    queryFn:()=>fetchFruit({pageParam:1}),
    initialPageParam:1,
    getNextPageParam: (_lastPage: number, allPages:Fruit[][]) => {
      if(allPages.length < 5){
        return allPages.length + 1
      }
      return undefined
    }
  })


  if(isLoading) return (<h1>Loading...</h1>)
    
  if(isError) return (<h1>{error.message}</h1>)

  return(
    <div>
      {
        data && data.data.length ? (
          <>
          {
            data.data.map(f=>(
              <div key={f.id} className="post-item">
                <h3 className="post-title">{f.name}</h3>
              </div>
            ))
          }
          <button>Load More</button>
          </>
        ) : (<h2>No Fruit(s)</h2>)
      }
    </div>
  )
}