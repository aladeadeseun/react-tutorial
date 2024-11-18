import { useSelector } from "react-redux"
import { ReduxToolKitStates } from "../type"

export default function CounterValue(){
  
  const countValue = useSelector(({counter:{countValue}}:ReduxToolKitStates)=>{
    //console.log(state)
    return countValue
  })

  console.log(countValue)

  return (
    <p>Counter value is {countValue}</p>
  )
}