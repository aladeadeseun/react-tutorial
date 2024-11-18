import { useQueries, useQuery } from "@tanstack/react-query"
import { getTodo, getTodosIds } from "./api"

export const useTodosIds = ()=>{
  return useQuery({
    //this key is use to revalidate your query
    queryKey:["todos"],
    //query function must always return promise
    queryFn:getTodosIds,
    //don't refetch when window lose focus
    refetchOnWindowFocus:false,
  })
}

export function useTodos(ids:(number)[]){
  //parallel getting todos
  return useQueries({
    queries:ids.map((id)=>({
      queryKey:["todo", {id}],
      queryFn: ()=>getTodo(id)
    })),
  })
}