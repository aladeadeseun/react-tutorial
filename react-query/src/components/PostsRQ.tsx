import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Post } from "../types";

const PostsRQ = () => {

  // /posts ["posts"]
  // /posts/1 ["posts", post.id]
  // /posts/1/comments ["posts", post.id, "comments"]
  const {data, isLoading, isError, error, isFetching, refetch} = useQuery({
    queryKey:["posts"],
    //this query must always return a promise
    queryFn:()=>{
      return axios.get<Post[]>("http://localhost:4000/posts")
    },
    //set the time the data will remain refresh
    staleTime:30000,
    //refetch every seconds (polling)
    //refetchInterval:1000,
    //if I move to another tab it'll continue to do polling
    //refetchIntervalInBackground:true,

    //disable automatic refetching
    enabled:false
  })

  console.log({isLoading, isFetching})

  if(isLoading) return (<h1>Loading...</h1>)
    
  if(isError) return (<h1>{error.message}</h1>)

  //console.log(data?.data)

  return (
    <div className="post-lists">
      <button onClick={()=>refetch()}>Fetch Posts</button>
      {
        data?.data.map(p=>(
          <div key={p.id} className="post-item">
            <h3 className="post-title"><Link to={`/rq-posts/${p.id}`}>{p.title}</Link></h3>
            <p className="post-body">{p.body}</p>
          </div>
        ))
      }
    </div>
  )
}

export default PostsRQ