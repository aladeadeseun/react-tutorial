export type Product = {
  price:number, id:number, title:string, thumbnail: string
}

export type CartItem = Product & {
  quantity:number, totalPrice:number
}

export type FetchProduct = {
  products:Product[]
}

export type ContextDataType = {
  listOfProducts:Product[],
  loading:boolean
}

export type RemoveProductData = {id:number, price: number}