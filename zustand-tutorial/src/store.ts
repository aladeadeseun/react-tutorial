import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type UserStore= {
  username:string,
  email:string,
  setUsername:(username: string)=>void,
  setEmail:(email: string)=>void
};

export const useUserStore = create(
  // (set)=>({
  //   username:'',
  //   email:'',
  //   setUsername:(username: string)=>({username})
  // })
  devtools<UserStore>((set)=>({
    username:'',
    email:'',
    setUsername:(username: string)=>set(()=>({username})),
    setEmail(email) {
      set(()=>({email}))
    },
  }), {name:"user", store:"user"})
)

type Post = {
  id:string,
  title:string,
  content:string
}

export type PostsStore = {
  posts:Post[],
  setPosts:(posts:Post[])=>void,
  addPost:(post: Post)=>void,
  removePost:(postId:string)=>void
}

export const usePostStore = create(
  devtools(immer<PostsStore>(
    (set)=>({
      posts:[],
      setPosts(posts){
        set(()=>({posts}))
      },
      addPost(post){
        //console.log(post)
        set(state=>{
          state.posts.push(post)
        })
      },
      removePost(postId) {
        set(state=>{
          const postIndex = state.posts.findIndex(p=>p.id === postId)
          state.posts.splice(postIndex, 1)
        })
      },
    }
  )), {name:"post", store:"post"}
  )
)
//const g = useUserStore()