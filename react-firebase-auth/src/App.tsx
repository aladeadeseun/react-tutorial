import { User } from "firebase/auth"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import AuthPage from "./pages/private-route"
import Profile from "./pages/profile"
import Register from "./pages/register"



function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={
        <AuthPage>
          {
            (user:User)=><Profile user={user}/>
          }
        </AuthPage>
      }/>
    </Routes>
  )
}

export default App
