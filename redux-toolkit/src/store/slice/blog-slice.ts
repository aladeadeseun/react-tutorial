import { createSlice } from "@reduxjs/toolkit";
import { BlogDataType, BlogListDataType } from "../../type";
import { getRandomId, updateBlogPostInLocalStore } from "../../util";

const initialState:BlogDataType = {
  formData:{title:'', description:'', id:''}, blogList:[]
}

const blogSlice = createSlice({
  name:"blog",
  initialState,
  reducers:{
    handleInputChange :(
      state:BlogDataType, 
      action:{payload:{ [x: string]: string; }, type:string}
    )=> {
      state.formData = {...state.formData, ...action.payload}
      //console.log(state.formData)
    },
    handleAddTodo:(state:BlogDataType)=>{
      //if the blog data as a value, it's an update
      if(state.formData.id){
        const cloneBlogList = [...state.blogList]
        const findIndex = cloneBlogList.findIndex(blog=>(blog.id === state.formData.id))
        if(findIndex > -1){
          cloneBlogList[findIndex] = state.formData
        }
        state.blogList = cloneBlogList
      }
      //create a new one
      else{
        //state.blogList = [...state.blogList, payload]
        state.blogList.push({...state.formData, id:getRandomId()})
      }//end else

      //save in local storage for later use
      updateBlogPostInLocalStore(state.blogList)

      state.formData = {title:'', description:'', id:''}
    },
    handleSetInitialBlogList(state:BlogDataType, {payload}:{payload:BlogListDataType, type: string}){
      state.blogList = payload
    },
    handleUpdateOrDeleteBlog(state:BlogDataType,{payload:{id, toDelete}}:{payload:{id:string, toDelete:boolean}}){
      //if to delete
      if(toDelete){
        //update store
        state.blogList = state.blogList.filter(blog=>(blog.id !== id))
        //save in local storage for later use
        updateBlogPostInLocalStore(state.blogList)
      }
      //this is an update
      else{
        //get blog from state
        const toUpdateBlog = state.blogList.find(blog=>(blog.id === id))
        //if the blog with the supplied id exists
        if(toUpdateBlog){
          state.formData = toUpdateBlog
        }
      }
    }
  }
})

export const {
  handleInputChange, 
  handleAddTodo, 
  handleSetInitialBlogList,
  handleUpdateOrDeleteBlog
} = blogSlice.actions

export default blogSlice.reducer