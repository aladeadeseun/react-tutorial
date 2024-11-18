import { useCallback, useState } from "react";
import Counter from "./counter";

export default function UseCallback(){
  const [countOne, setCountOne] = useState(0)
  const [countTwo, setCountTwo] = useState(0)

  // const countOneOnClickHandler = useCallback(()=>{
  //   setCountOne(count=>(count + 1))
  // }, [setCountOne])

  // const countTwoClickHandler = useCallback(()=>{
  //   setCountTwo(count=>(count + 1))
  // }, [setCountTwo])

  const countOneOnClickHandler = useCallback(()=>{
    setCountOne((countOne + 1))
  }, [countOne])

  const countTwoClickHandler = useCallback(()=>{
    setCountTwo((countTwo + 1))
  }, [countTwo])

  return (
    <div>
      <h1>Use Callback</h1>
      <Counter countValue={countOne} onClickHandler={countOneOnClickHandler}/>
      <Counter countValue={countTwo} onClickHandler={countTwoClickHandler}/>
    </div>
  )
}