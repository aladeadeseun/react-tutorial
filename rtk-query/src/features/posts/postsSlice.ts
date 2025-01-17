import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../../app/store'
import { sub } from 'date-fns'

import { userLoggedOut } from '../auth/authSlice'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string,
  user: string,
  date: string,
  reactions: Reactions
}

export type ReactionName = keyof Reactions

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState: Post[] = [
  { 
    id: '1', 
    title: 'First Post!', 
    content: 'Hello!', 
    user: '0', 
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions:initialReactions
  },
  { 
    id: '2', 
    title: 'Second Post', 
    content: 'More text', 
    user: '2', 
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions:initialReactions
  }
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionName }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },

    // Declare a "case reducer" named `postAdded`.
    // The type of `action.payload` will be a `Post` object.
    postAdded:{
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { 
            id: nanoid(), 
            title, content, 
            user:userId, 
            date: new Date().toISOString(), 
            reactions:initialReactions
          }
        }
      },
      reducer(state, action: PayloadAction<Post>) {
        // "Mutate" the existing state array, which is
        // safe to do here because `createSlice` uses Immer inside.
        state.push(action.payload)
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }, //end reducer
  selectors: {
    // Note that these selectors are given just the `PostsState`
    // as an argument, not the entire `RootState`
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => {
      return postsState.find(post => post.id === postId)
    }
  },
  extraReducers: (builder) => {
    // Pass the action creator to `builder.addCase()`
    builder.addCase(userLoggedOut, () => {
      // Clear out the list of posts whenever the user logs out
      return []
    })
  },
})

// Export the generated reducer function
export default postsSlice.reducer

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export const selectAllPosts = (state: RootState) => state.posts

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.find(post => post.id === postId)

export const { selectAllPosts, selectPostById,  } = postsSlice.selectors