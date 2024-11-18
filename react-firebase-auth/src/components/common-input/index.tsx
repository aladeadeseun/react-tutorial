import { FormInputControl, FormInputType } from "../../type"


export default function CommonInput({
  type=FormInputType.text, 
  placeholder="Enter value",
  value,
  onChange,
  className='',
  name
}:FormInputControl){
  return (
    <p>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        className={className} 
        onChange={onChange} 
        name={name}
        style={{padding:"5px"}}
      />
    </p>
  ) 
}