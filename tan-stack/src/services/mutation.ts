import { useMutation } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo(){

  //const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    //mutate run first
    onMutate(variables) {
      console.log((variables))
    },
    onError(error, variables, context) {
      console.log({error, variables, context})
    },
    //success run next
    onSuccess(data, variables, context) {
      console.log({data, variables, context})
    },
    //settled run last
    async onSettled(_data, error) {
      //console.log({data, variables, context, error})
      //, variables, context
      if(error){
        console.log(error)
      }else{
        //tell the tan-stack to refetch from server
        //await queryClient.invalidateQueries({queryKey:['todos', {id:variables.id}]})
      }
    },
  })
}

export function useUpdateTodo(){
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async(_, error)=>{
      if(error){
        console.log(error)
      }else{
        //tell the tan-stack to refetch from server
        //await queryClient.invalidateQueries({queryKey:['todos']})
      }
    }
  })
}

export function useDeleteTodo(){
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess(){},
    onSettled(_, error){
      if(error){
        console.log(error)
      }else{
        //await queryClient.invalidateQueries({queryKey:['todos']})
      }
    }
  })
}