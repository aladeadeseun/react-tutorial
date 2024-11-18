//create context
//provide the state to the context
//wrap context in root component

import { createContext, ReactNode, useEffect, useState, } from "react";
import { CartItem, Product, RemoveProductData } from "../type";

//import { ContextDataType } from "../type";

const initialContext:{
  handleSetProductInCartHandler:(product: Product)=>void,
  cartItems:CartItem[],
  handleRemoveFromCart:(productData: RemoveProductData, removeAll: boolean)=>void
} = {
  handleSetProductInCartHandler:()=>{}, 
  cartItems:[],
  handleRemoveFromCart:()=>{}
}

//consume the context using useContext
export const ShoppingCartContext = createContext(initialContext)

export default function ShoppingCartProvider({children}:{children: ReactNode}){
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(function(){
    const cartItemInStr = window.localStorage.getItem('cart')
    if(cartItemInStr){
      setCartItems(JSON.parse(cartItemInStr) as CartItem[])
    }
    else{
      setCartItems([])
    }
  }, [])

  const handleSetProductInCartHandler = (product: Product)=>{
    //check if the product already exists in cart
    const cartProductIndex = cartItems.findIndex(p=>p.id === product.id)

    console.log({cartProductIndex})

    if(cartProductIndex > -1){
      cartItems[cartProductIndex].quantity += 1
      cartItems[cartProductIndex].totalPrice += product.price
    }else{
      cartItems.push({...product, quantity:1, totalPrice:product.price})
    }
    //set item instate
    setCartItems([...cartItems])

    window.localStorage.setItem("cart", JSON.stringify(cartItems))
  }

  const handleRemoveFromCart = (product: RemoveProductData, removeAll: boolean)=>{
    if(removeAll){
      const newCartItems = cartItems.filter(cartItem=>(cartItem.id !== product.id))
      setCartItems([...newCartItems])

      window.localStorage.setItem("cart", JSON.stringify(newCartItems))
    }else{
      //
      const cartItemIndex = cartItems.findIndex(cartItem=>(cartItem.id === product.id))
      //console.log(cartItemIndex)
      //if the item exist in array and have two and above quantity
      if(cartItemIndex > -1 && cartItems[cartItemIndex].quantity > 1){
        
        //remove 1
        cartItems[cartItemIndex].quantity -= 1
        //remove the price and set back in state
        cartItems[cartItemIndex].totalPrice -= product.price
        //
        window.localStorage.setItem("cart", JSON.stringify(cartItems))
        setCartItems([...cartItems])
      }//end if
    }//end else
  }//end handler
  
  return (
    <ShoppingCartContext.Provider 
      value={{cartItems, handleSetProductInCartHandler, handleRemoveFromCart}}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
