import { User } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

export default function Profile({user}:{user:User}){
  
  const {handleSignOut, setLoading, loading, setUser} = useContext(AuthContext)

  const navigate = useNavigate()

  if(loading) return <h1>Loading...</h1>

  function handleSignOutHelper(){
    setLoading(true)
    handleSignOut()
    .then(()=>{
      setUser(null)
      //redirect to login page
      navigate("/login")
    })
    .catch(console.error)
    .finally(()=>setLoading(false))
  }

  return (
    <div>
      <h3>{user.displayName || "Unknow display name"}</h3>
      <p>{user.email}</p>
      <button onClick={handleSignOutHelper} style={{cursor:"pointer"}}>Log Out</button>
    </div>
  )
}