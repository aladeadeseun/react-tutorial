import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import counterReducer from "../features/counter/counterSlice"
import postReducer from "../features/posts/postsSlice"
import userReducer from "../features/users/usersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter:counterReducer,
    posts:postReducer,
    users:userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//const incrementAction = ()=>({type:"counter/increment", payload:1})

// store.subscribe(()=>{
//   console.log(store.getState())
// })

// store.dispatch(incrementAction())

// store.dispatch(incrementAction())

//console.log(store.getState())

// const selectCounterValue = (state:{counter:{value:number}})=>state.counter.value

// console.log(selectCounterValue(store.getState()))
