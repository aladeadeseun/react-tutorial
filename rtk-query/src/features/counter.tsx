import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { decrement, increment, incrementAsync, incrementByAmount } from "./counter/counterSlice"



export default function Counter(){

  const value = useAppSelector(({counter:{value}})=>value)
  
  const status = useAppSelector(state=>state.counter.status)

  console.log(status)

  const dispatch = useAppDispatch()

  const increaseByAmountRef = useRef<null | HTMLInputElement>(null)
  //const dispatch = useDispatch()

  const handleIncrement = ()=>{
    dispatch(increment())
  }

  const handleDecrement = ()=>{
    dispatch(decrement())
  }

  const handelIncrementByAmount = ()=>{
    //console.log(increaseByAmountRef)
    if(increaseByAmountRef.current){
      const value = increaseByAmountRef.current.value
      //console.log(value)
      if(value){
        //console.log({value})
        dispatch(incrementByAmount(parseInt(value)))
      }
    }
  }

  const handleIncrementAsync = ()=>{
    dispatch(incrementAsync(4))
  }

  return (
    status === "loading" ? (
      <h1>Loading....</h1>
    ) : (
      <div>
        <h1>Simple Counter</h1>
        <h3>{value}</h3>

        <div>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
        </div>
        <div>
          <input type="number" ref={increaseByAmountRef}/> 
          <button onClick={handelIncrementByAmount}>Increment By Amount</button>
        </div>
        <p>
          <button onClick={handleIncrementAsync}>Dispatch Increment Async</button>
        </p>
      </div>
    )
  )
}