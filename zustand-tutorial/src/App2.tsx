import AddPost from "./AddPost"
import { useUserStore } from "./store"


function App() {
  
  const {email, username, setEmail,setUsername} = useUserStore()

  return (
    <>
      <h2>Hello world</h2>
      <div>{username}</div>
      <div>{email}</div>
      <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/><br /><br />
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
      <br />
      <br />
      <AddPost/>
    </>
  )
}

export default App
