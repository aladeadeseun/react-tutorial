import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types";

export default function PostsTraditional(){
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPosts = async ()=>{

    try{
      const response = await axios.get<Post[]>("http://localhost:4000/posts")
      setPosts(response.data)
    }
    catch(error){
      setError(error as Error)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(function(){
    fetchPosts()
  }, [])

  if(isLoading) return (<h1>Loading...</h1>)
    
  if(error) return (<h1>{error.message}</h1>)

  return (
    <div className="post-lists">
      {
        posts.map(p=>(
          <div key={p.id} className="post-item">
            <h3 className="post-title">{p.title}</h3>
            <p className="post-body">{p.body}</p>
          </div>
        ))
      }
    </div>
  )
}