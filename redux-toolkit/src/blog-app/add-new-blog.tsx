import { ChangeEvent, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleAddTodo, handleInputChange } from "../store/slice/blog-slice"
import { ReduxToolKitStates } from "../type"

export default function AddNewBlog(){

  const dispatch = useDispatch()

  const formData = useSelector(({blog:{formData}}:ReduxToolKitStates)=>{
    //console.log(state)
    return formData
  })

  const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>)=>{
    dispatch(handleInputChange({[event.target.name]:event.target.value}))
  }

  const handleTodoSubmit=(evt: FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    dispatch(handleAddTodo())
  }

  return (
    <div>
      <h3>Add New Blog</h3>
      <form onSubmit={handleTodoSubmit}>
        <div>
          <label htmlFor="title">Enter Blog Title</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Enter Blog Title" 
            onChange={onChangeEventHandler}
            value={formData.title}
          />
        </div>
        <div>
          <label htmlFor="description">Enter Blog Description</label>
          <input 
            type="text" 
            name="description" 
            placeholder="Enter Blog Description" 
            onChange={onChangeEventHandler}
            value={formData.description}
          />
        </div>
        <button type="submit">
          {
            formData.id ? 'Update Blog' : 'Add New Blog'
          }
        </button>
      </form>
    </div>
  )
}