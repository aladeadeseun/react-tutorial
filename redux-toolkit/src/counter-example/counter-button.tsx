import { useDispatch } from "react-redux"
import { handleIncreaseCountAction } from "../store/slice/counter"

export default function CounterButton(){

  const dispatch = useDispatch()

  function handleClick(){
    dispatch(handleIncreaseCountAction(1))
  }

  return (
    <button 
      style={{backgroundColor:'black', color:'white', fontWeight:"bold", cursor:"pointer"}}
      onClick={handleClick}
    >
      Increase Count
    </button>
  )
}