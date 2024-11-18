type Product = {id:number, name: string}
const products: Product[] = [
  {id:1, name:"Product 1"},
  {id:2, name:"Product 2"},
  {id:3, name:"Product 3"},
  {id:4, name:"Product 4"},
  {id:5, name:"Product 5"},
  {id:6, name:"Product 6"}
]

export const fetchListOfProducts = ()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(products)
    }, 1000)
  })
}


export const  addNewProduct = (name: string)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const newProdcut = {id:(products.length + 1), name}
      products.push(newProdcut)
      resolve(newProdcut)
    }, 1000)
  })
}