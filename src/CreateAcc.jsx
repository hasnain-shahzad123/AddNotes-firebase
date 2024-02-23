import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import firebaseConfig from './firebaseConfig';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();
const CreateAcc = () => {
  const [userInput,setUserInput]  = useState({email:"",Pass:""});

  

  const  EmailChange = (e)=>{
      const newObj = {...userInput,email:e.target.value}
      setUserInput(newObj);
  }
  const PassChange=(e)=>{
    const newObj = {...userInput,Pass:e.target.value}
    setUserInput(newObj);
  }

  function handleSignUp(){
    console.log("The email is ::",userInput.email);
    console.log("The Password is : ",userInput.Pass);
    createUserWithEmailAndPassword(auth,userInput.email,userInput.Pass)
  .then((userCredentials)=>{
    const user = userCredentials.user;
   alert("Sign up Successfully")
  }).catch((error)=>{
      console.log("The eror is :: ",error);
      console.log("Cannot sign up with this email and pass");
  })
  const newObj = {email:"",Pass:""}
  setUserInput(newObj);

  }
  return (
    <div className="LoginBox">
        <h2>SIGN UP</h2>
        <div className="SignInOpt" ><Link to="/">Already have an Account? Sign in</Link></div>
        <div className="inputFields">
        {/* <div className="userName">
        <input type="text" id="username" placeholder="User Name" />
        </div> */}
        <div className="userNameField">
        <input type="Email" id="email" required value={userInput.email} onChange={EmailChange} placeholder="Enter user Email" />
        </div>
        <div className="passWordField">
        <input type="password" id="password" required value={userInput.Pass} onChange={PassChange} placeholder="Enter Password" />
        </div>
        </div>
        <button type='submit' id='SubmitBtn' onClick={handleSignUp}>SIGN UP</button>
       
    </div>
  )
}
export default CreateAcc;
