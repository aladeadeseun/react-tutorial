import { BlogListDataType } from "../type"

export const getRandomId = ()=>(Math.random() * Math.random() * Math.random()).toString(16).replace(".", "")

export const updateBlogPostInLocalStore = (blogList:BlogListDataType)=>(
  localStorage.setItem("blog", JSON.stringify(blogList))
)