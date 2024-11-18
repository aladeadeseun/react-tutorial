import { updateProfile } from "firebase/auth";
import { ChangeEvent, FormEvent, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common-form";
import { AuthContext } from "../../context";
import { FormInputType, WhichFormControl } from "../../type";

export default function Register(){

  const {
    registeration, 
    setRegistration, 
    registerWithFirebase,
    loading, setLoading, user
  } = useContext(AuthContext)

  const navigate = useNavigate()

  if(user){
    return <Navigate to='/profile'/>
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>)=>{
    setRegistration({...registeration, [evt.target.name]:evt.target.value})
  }

  const handleSubmitHandler = (evt: FormEvent<HTMLFormElement>)=>{
    //set loading to true
    setLoading(true)

    evt.preventDefault()

    registerWithFirebase({email:registeration.email, password:registeration.password})
    .then(result=>{
      //console.log(result)
      if(result.user){
        //set loading to true
        setLoading(true)
        //update profile
        //I need not do anything here because when ever the user data changes, the 
        //on change event handler register in useEffect of the AuthContext file automatically run
        //and the user state is updated to reflect the new user change
        updateProfile(result.user, {displayName:registeration.name})
        //display error
        .catch(console.error)
        //finally set loading to false
        .finally(()=>{
          setLoading(false)
          navigate("/profile")
        })
      }//end if

    })
    .catch(error=>{
      console.error(error)
    })
    .finally(()=>setLoading(false))
  }

  //use
  return (
    <div>
      <h3>Welcome Back</h3>
      <p>Register Page</p>
      {
        loading ? (
          <h1>Loading...</h1>
        ) : (
          <CommonForm 
            formControls={[
              {
                which:WhichFormControl.input,
                value:registeration.name, 
                placeholder:"Enter Your Name",
                name:"name",
                type:FormInputType.text,
                onChange:handleInputChange
              },
              {
                which:WhichFormControl.input,
                value:registeration.email, 
                placeholder:"Enter Your Email",
                name:"email",
                type:FormInputType.email,
                onChange:handleInputChange
              },
              {
                which:WhichFormControl.input,
                value:registeration.password, 
                placeholder:"Enter Your Password",
                name:"password",
                type:FormInputType.password,
                onChange:handleInputChange
              }
            ]}
            onSubmitHandler={handleSubmitHandler}
            buttonText="Save"
          />
        )
      }
      
    </div>
  )
}