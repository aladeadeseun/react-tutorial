import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import blogReducer from "./slice/blog-slice";
import counterReducer, { handleIncreaseCountAction } from "./slice/counter";

const store = configureStore({
  reducer:{
    counter:counterReducer,
    blog:blogReducer
  }
})

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
  console.log(`Counter before: ${stateBefore.counter.countValue}`)
  dispatch(handleIncreaseCountAction(1))
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter.countValue}`)
}

store.dispatch(exampleThunkFunction)

const logAndAdd = (amount: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter.countValue}`)
    dispatch(handleIncreaseCountAction(amount))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter.countValue}`)
  }
}

store.dispatch(logAndAdd(5))

const logAndAddThunk:(amount: number) => AppThunk = (amount: number)=>{
  return (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter.countValue}`)
    dispatch(handleIncreaseCountAction(amount))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter.countValue}`)
  }
}

store.dispatch(logAndAddThunk(6))

export default store