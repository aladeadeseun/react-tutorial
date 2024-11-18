import { FormEvent } from "react";
import { FormControl, WhichFormControl } from "../../type";
import CommonInput from "../common-input";

function renderFormElements(oneFormControl:FormControl){
  switch(oneFormControl.which){
    case WhichFormControl.input:
      return <CommonInput {...oneFormControl} key={oneFormControl.name}/>
    default: return null
  }
}

export default function CommonForm({
  buttonText='Submit', 
  formControls, 
  onSubmitHandler
}:{
  buttonText?: string, 
  formControls:FormControl[],
  onSubmitHandler:(event: FormEvent<HTMLFormElement>)=>void
}){
  return (
    <form onSubmit={onSubmitHandler}>
      {
        formControls.map((oneFormControl: FormControl)=>renderFormElements(oneFormControl))
      }
      <button type="submit">{buttonText}</button>
    </form>
  )
}