import { createSlice } from "@reduxjs/toolkit";
import { IncrementCountType } from "../../type";

const initialValue: IncrementCountType = {
  countValue:0
}

const counterSlice = createSlice({
  name:"counter",
  initialState:initialValue,
  reducers:{
    handleIncreaseCountAction:(state:IncrementCountType, action:{payload:number,type:string})=>{
      //console.log({state, action})
      state.countValue += action.payload
    }
  }
})

export const {handleIncreaseCountAction} = counterSlice.actions

export default counterSlice.reducer