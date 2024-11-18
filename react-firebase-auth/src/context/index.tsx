import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import auth from "../firebase-config";
import { AuthDataType, RegistrationType } from "../type";

export const AuthContext = createContext<{
  registeration:RegistrationType, 
  setRegistration: React.Dispatch<React.SetStateAction<RegistrationType>>,
  registerWithFirebase:(authData:AuthDataType)=>Promise<UserCredential>,
  loading:boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  user:User | null,
  setLoginData: React.Dispatch<React.SetStateAction<AuthDataType>>,
  loginData:AuthDataType,
  loginWithFirebase:()=>Promise<UserCredential>
  handleSignOut:()=>Promise<void>
}>({
  registeration:{name:'', password:'', email:''},
  setRegistration:()=>{},
  registerWithFirebase:()=>Promise.resolve({} as UserCredential),
  loginWithFirebase:()=>Promise.resolve({} as UserCredential),
  loading:false,
  setLoading:()=>{},
  setUser:()=>{},
  user:null,
  setLoginData:()=>{},
  loginData:{password:'', email:''},
  handleSignOut:()=>Promise.resolve()
})

export default function AuthState({children}:{children: ReactNode}){

  const [registeration, setRegistration] = useState<RegistrationType>({name:'', password:'', email:''})

  const [loginData, setLoginData] = useState<AuthDataType>({email:'', password:''})

  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const checkAuthState = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      setLoading(false)
    }, error=>{
      setLoading(false)
      console.error(error)
    })

    return ()=>{
      checkAuthState()
    }
  }, [])

  function registerWithFirebase(authData:AuthDataType){
    //event.preventDefault()
    const {email, password} = authData
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function loginWithFirebase(){
    const {email, password} = loginData

    return signInWithEmailAndPassword(auth, email, password)
  }

  function handleSignOut(){
    return signOut(auth)
  }

  return (
    <AuthContext.Provider 
      value={{
        registeration, 
        setRegistration, 
        registerWithFirebase, 
        loading, setLoading,
        user, setUser, loginData, 
        setLoginData,
        loginWithFirebase,
        handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}