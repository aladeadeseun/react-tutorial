
type BlogFormData = {
  title:string,
  description:string,
  id:string
}

export type BlogListDataType = BlogFormData[]

export type BlogDataType = {
  formData:BlogFormData,
  blogList:BlogListDataType
}

export type IncrementCountType = { countValue:number }

export type ReduxToolKitStates = {
  blog:BlogDataType,
  counter:IncrementCountType
}