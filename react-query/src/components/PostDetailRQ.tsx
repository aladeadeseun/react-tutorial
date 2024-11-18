import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Post } from "../types"

const PostDetailsRQ = ()=>{
  const {postId} = useParams<{postId:string}>()

  console.log(postId)

  const {data, isLoading, isError, error, } = useQuery({
    queryKey:["posts", postId],
    //this query must always return a promise
    queryFn:()=>{
      return axios.get<Post | null>(`http://localhost:4000/posts/${postId}`)
    },
  })


  if(isLoading) return (<h1>Loading...</h1>)
    
  if(isError) return (<h1>{error.message}</h1>)


    console.log(data);

  return (
    data && data.data ? (
      <div className="post-details-container">
        <div className="post-details-title">{data.data.title}</div>
        <div className="post-details-body">{data.data.body}</div>
      </div>
    ) : (
      <h3>Post not found!</h3>
    )
  )
}

export default PostDetailsRQ