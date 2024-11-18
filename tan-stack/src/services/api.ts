import axios from "axios"
import { Todo } from "../types/todo"

const BASE_URL = "http://localhost:4000"

const axiosInstance = axios.create({baseURL:BASE_URL})

export const getTodosIds = async function() {
  return (await axiosInstance.get<Todo[]>("todos")).data.map(todo=>todo.id)
}

export const getTodo = async function(id: number){
  return (await axiosInstance.get<Todo>(`todo/${id}`)).data
}

export const createTodo = function(data: Todo){
  return axiosInstance.post("todos", data)
}

export const updateTodo = function(data: Todo){
  return axiosInstance.post(`todos/${data.id!}`, data)
}

export const deleteTodo = (id: string)=>{
  return axiosInstance.delete(`todos/${id}`)
}

//export