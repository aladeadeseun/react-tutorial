import { memo } from "react"

function Counter({countValue, onClickHandler}:{countValue: number, onClickHandler:()=>void}){
  console.log("This is getting rendered")
  return(
    <div>
      <p>{countValue}</p>
      <button onClick={onClickHandler}>Click</button>
    </div>
  )
}

export default memo(Counter)