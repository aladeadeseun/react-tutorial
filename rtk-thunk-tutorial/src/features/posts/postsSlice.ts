import { createEntityAdapter, createSelector, createSlice, EntityState, nanoid, PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../../app/store'
//import { sub } from 'date-fns'

import { RootState } from '../../app/store'
import { logout } from '../auth/authSlice'

import { client } from '../../api/client'

import { AppStartListening } from '../../app/listenerMiddleware'
import { createAppAsyncThunk } from '../../app/withTypes'
import { getUrl } from '../../util'

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
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts', 
  async () => {
    const response = await client.get<Post[]>(getUrl("/posts"))
    return response.data
  },
  {
    condition(_arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  }
)

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: NewPost) => {
    // We send the initial data to the fake API server
    const response = await client.post<Post>(getUrl("posts"), initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

// interface PostsState {
//   posts: Post[]
//   status: 'idle' | 'pending' | 'succeeded' | 'failed'
//   error: string | null
// }

interface PostsState extends EntityState<Post, string> {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const postsAdapter = createEntityAdapter<Post>({
  // Sort in descending date order
  sortComparer: (a, b) => Date.parse(b.date) - Date.parse(a.date)
})

const initialState: PostsState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})

// const initialState: PostsState = {
//   posts: [],
//   status: 'idle',
//   error: null
// }

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: addNewPost.fulfilled,
    effect: async (_action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    }
  })
}

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
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
      // //const existingPost = state.posts.find(post => post.id === postId)
      // const existingPost = state.entities[postId]

      // if (existingPost) {
      //   existingPost.reactions[reaction]++
      // }
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
        //state.posts.push(action.payload)
        //state.entities[action.payload.id] = action.payload
        postsAdapter.addOne(state, action.payload)
        //state.ids.unshift(action.payload.id)
        //postsAdapter.addOne(action.payload)
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload

      //const existingPost = state.posts.find(post => post.id === id)

      // const existingPost = state.entities[id]

      // if (existingPost) {
      //   existingPost.title = title
      //   existingPost.content = content
      // }
      postsAdapter.updateOne(state, {id, changes:{title, content}})
    }
  }, //end reducer
  selectors: {
    // Note that these selectors are given just the `PostsState`
    // as an argument, not the entire `RootState`
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => {
      //return postsState.posts.find(post => post.id === postId)
      return postsState.entities[postId]
    }
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, () => {
      // Clear out the list of posts whenever the user logs out
      return initialState
    }).addCase(fetchPosts.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      //state.posts.push(...action.payload)
      // Save the fetched posts into state
      postsAdapter.setAll(state, action.payload)
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      //state.status
      state.error = action.error.message ?? 'Unknown Error'
    })
    // .addCase(addNewPost.fulfilled, (state, action) => {
    //   // We can directly add the new post object to our posts array
    //   state.posts.push(action.payload)
    // })
    .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    //postsAdapter.addOne
  }
})

// Export the generated reducer function
export default postsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export const selectAllPosts = (state: RootState) => state.posts

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.find(post => post.id === postId)

//export const { selectAllPosts, selectPostById,  } = postsSlice.selectors
//export const selectAllPosts = (state: RootState) => state.posts.posts

//export const selectPostById = (state: RootState, postId: string) =>
  //state.posts.posts.find(post => post.id === postId)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

// export const selectPostsByUser = (state: RootState, userId: string) => {
//   const allPosts = selectAllPosts(state)
//   // ❌ This seems suspicious! See more details below
//   return allPosts.filter(post => post.user === userId)
// }

export const selectPostsByUser = createSelector(
  // Pass in one or more "input selectors"
  [
    // we can pass in an existing selector function that
    // reads something from the root `state` and returns it
    selectAllPosts,
    // and another function that extracts one of the arguments
    // and passes that onward
    (_state: RootState, userId: string) => userId
  ],
  // the output function gets those values as its arguments,
  // and will run when either input value changes
  (posts, userId) => posts.filter(post => post.user === userId)
)