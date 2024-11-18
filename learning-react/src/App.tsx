import { useEffect, useRef } from "react"
import UseCallback from "./components/use-callback"
import UseMemo from "./components/use-memo"

function App() {
  
  const countValue = useRef<number>(0)
  const divReference = useRef<HTMLDivElement | null>(null)
  const inputRef  = useRef<HTMLInputElement| null>(null)

  useEffect(()=>{
    console.log()
    const divElem = divReference.current
    if(divElem){
      divElem.style.color = "red";

      setTimeout(()=>{
        divElem.style.color = "green"
        
      }, 2000)
    }
    
    if(inputRef.current){
      inputRef.current.focus()
    }

    console.log(inputRef.current)

  }, [])

  function handleClick(){
    countValue.current++
    console.log(countValue.current)
  }

  return (
    <>
      <h1>Learning Ref, Memo and UseCallback</h1> 
      <div ref={divReference}>Some random Text</div>
      <input type="text" name="" id="" placeholder="Enter your name" ref={inputRef}/><br />fjf
      <button onClick={handleClick}>Click Me</button>     
      <br />
      <UseMemo/>
      <UseCallback/>
    </>
  )
}

export default App
