import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleSetInitialBlogList, handleUpdateOrDeleteBlog } from "../store/slice/blog-slice"
import { BlogListDataType, ReduxToolKitStates } from "../type"

export default function BlogList(){

  const blogList = useSelector(({blog:{blogList}}:ReduxToolKitStates)=>(blogList))
  const dispatch = useDispatch()

  useEffect(function(){
    let blogList:BlogListDataType
    try{
      const blogListAsStr = localStorage.getItem("blog")
      if(blogListAsStr){
        blogList = JSON.parse(blogListAsStr) as BlogListDataType
      }else{
        blogList = []
      } 
    }
    catch(e){
      console.error(e)
      blogList = []
    }
    dispatch(handleSetInitialBlogList(blogList))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteAndUpdate = (id:string, toDelete:boolean)=>()=>{
    //console.log(id)
    dispatch(handleUpdateOrDeleteBlog({id, toDelete}))
  }

  return(
    <div>
      <h1>Blog List</h1>
      {
        blogList.length > 0 ? (
          <ul>
            {
              blogList.map(bl=>(
                <li key={bl.id}>
                  <h3>{bl.title}</h3>
                  <p>{bl.description}</p>
                  <p>
                    <button style={{cursor:"pointer"}} onClick={handleDeleteAndUpdate(bl.id, false)}>Edit</button>
                    <button style={{cursor:"pointer"}} onClick={handleDeleteAndUpdate(bl.id, true)}>Delete</button>
                  </p>
                </li>
              ))
            }
          </ul>
        ) : (<h1>No blog post added, please add one.</h1>)
      }
    </div>
  )
}