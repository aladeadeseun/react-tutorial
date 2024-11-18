import { User } from "firebase/auth";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

export default function AuthPage({children}:{children:(user:User)=>ReactNode}){

  const {user, loading} = useContext(AuthContext)

  if(loading) return <h1>Loading...</h1>

  return (
    user ? (
      <div>{children(user)}</div>
    ) : (
      <Navigate to="/login"/>
    )
  )
}