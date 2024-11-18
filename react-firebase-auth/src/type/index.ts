import { ChangeEvent } from "react"

//Add for select, textarea, etc
export enum FormInputType {
  text="text",
  password="password",
  email = "email"
}

export enum WhichFormControl{
  input="input"
}

export type FormInputControl = {
  type?:FormInputType, 
  placeholder?:string,
  value:string,
  onChange:(event: ChangeEvent<HTMLInputElement>)=>void,
  className?:string
  which:WhichFormControl.input,
  name:string
}

export type FormControl = FormInputControl

export type RegistrationType = {name:string, password:string, email:string}

export type AuthDataType = {password:string,email:string}