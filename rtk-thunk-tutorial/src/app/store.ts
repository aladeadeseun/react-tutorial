import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import authReducer from "../features/auth/authSlice"
import counterReducer, { increment, incrementByAmount } from '../features/counter/counterSlice'
import notificationReducer from "../features/notifications/notificationsSlice"
import postsReducer from "../features/posts/postsSlice"
import usersReducer from "../features/users/usersSlice"

import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    posts:postsReducer,
    auth:authReducer,
    users:usersReducer,
    notifications:notificationReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

// omit actual store setup

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>


const exampleThunkFunction = (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter.value}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter.value}`)
}

const logAndAdd = (amount: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter.value}`)
    dispatch(incrementByAmount(amount))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter.value}`)
  }
}

// Use `AppThunk` as the return type, since we return a thunk function
const logAndAddWithThunk = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before logAndAddWithThunk: ${stateBefore.counter.value}`)
    dispatch(incrementByAmount(amount))
    const stateAfter = getState()
    console.log(`Counter after logAndAddWithThunk: ${stateAfter.counter.value}`)
  }
}

store.dispatch(exampleThunkFunction)

store.dispatch(logAndAdd(6))

store.dispatch(logAndAddWithThunk(8))