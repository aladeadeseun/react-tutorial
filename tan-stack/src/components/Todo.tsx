//import { useIsFetching } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutation";
import { useTodosIds } from "../services/queries";


// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  title: HTMLInputElement
  desc: HTMLTextAreaElement,
  //postAuthor:HTMLSelectElement,
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}


export default function Todo(){

  const {isPending, data, isError, error} = useTodosIds()

  //this actually a dummy, to differentiate between update and create
  const [isUpdate] = useState(false)

  const createTodoMutation = useCreateTodo()

  const updateTodoMutation = useUpdateTodo()

  const useDeleteTodoMutation = useDeleteTodo()

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.title.value
    const desc = elements.desc.value

    if(isUpdate){
      updateTodoMutation.mutate({title, description:desc, checked:true,id:"456"})
    }else{
      //addPost({title, content, id:(posts.length + 1).toString()})
      createTodoMutation.mutate({title, description:desc,checked:false})
    }
    

    //const form = e.currentTarget

    e.currentTarget.reset()
  }

  const handleDeleteAsync = async ()=>{
    //using async 
    const deleteResult = await useDeleteTodoMutation.mutateAsync("1")
    console.log(deleteResult)
  }


  //const 

  // const isFetchingGlobal = useIsFetching()
  //isFetching, isLoading

  // console.log({isPending, isFetching, isLoading, data, isFetchingGlobal})

  if(isPending){
    return <span>Loading...</span>
  }

  if(isError){
    return <span>{error.message}</span>
  }

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </p>  
        <p>
          <label htmlFor="desc">Description</label>
          <input type="text" name="desc" />
        </p> 
        <p>
          <input 
            type="submit" 
            disabled={createTodoMutation.isPending}
            value = {createTodoMutation.isPending ? 'Creating...' :"Submit"}
          />
          <button onClick={()=>useDeleteTodoMutation.mutate("1")}>Mock Delete</button>
          <button onClick={handleDeleteAsync}>Mock Delete With Async</button>
        </p>
      </form>
      {
        data.map((id)=><p key={id}>{id}</p>)
      }
    </>
  )
}