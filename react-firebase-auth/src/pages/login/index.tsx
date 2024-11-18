import { ChangeEvent, FormEvent, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import CommonForm from "../../components/common-form"
import { AuthContext } from "../../context"
import { FormInputType, WhichFormControl } from "../../type"

export default function Login(){
  const {loading, loginData, setLoginData, loginWithFirebase, setLoading, user, setUser} = useContext(AuthContext)

  const navigate = useNavigate()

  if(user){
    return <Navigate to={"/profile"}/>
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>)=>{
    setLoginData({...loginData, [evt.target.name]:evt.target.value})
  }

  const handleSubmitHandler = (evt: FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    setLoading(true)
    loginWithFirebase()
    .then(result=>{
      setUser(result.user)
      //console.log(user)
      navigate("/profile")
    })
    .catch(console.error)
    .finally(()=>setLoading(false))
  }

  return (
    <div>
      <h1>Welcome Back</h1>
      <p>Login Page</p>

      {
        loading ? (
          <h1>Loading...</h1>
        ) : (
          <CommonForm 
            formControls={[
              {
                which:WhichFormControl.input,
                value:loginData.email, 
                placeholder:"Enter Your Email",
                name:"email",
                type:FormInputType.email,
                onChange:handleInputChange
              },
              {
                which:WhichFormControl.input,
                value:loginData.password, 
                placeholder:"Enter Your Password",
                name:"password",
                type:FormInputType.password,
                onChange:handleInputChange
              }
            ]}
            onSubmitHandler={handleSubmitHandler}
            buttonText="Login"
          />
        )
      }

    </div>
  )
}