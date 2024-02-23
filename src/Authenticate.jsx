import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from './context/UserContext';

const Authenticate = () => {
  const navigate = useNavigate();

  const { setUid } = useContext(UserContext);
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    setAuth(getAuth());
  }, [])

  // hook is for sign in 
  const [SignINvalues, setSignINValues] = useState({ email: "", pass: "", });

  const Emailhandler = (e) => {
    const newValues = { ...SignINvalues, email: e.target.value };
    setSignINValues(newValues)
  }
  const passWordHandler = (e) => {
    const newValues = { ...SignINvalues, pass: e.target.value };
    setSignINValues(newValues)
  }

  function handle() {
    signInWithEmailAndPassword(auth, SignINvalues.email, SignINvalues.pass)
      .then((userCredentials) => {
        setUid(userCredentials.user.uid);
        navigate("/dash");
      })
      .catch((error) => {
        alert("Error", error);
      })
    const newValues = { email: "", pass: "" };
    setSignINValues(newValues)
  }
  return (

    <div className="LoginBox" >
      <h2>LOGIN</h2>
      <div className='signInInstructions'><p>LOGIN with your username and Password</p></div>
      <div className="inputFields">
        <div className="userNameField">
          <input type="Email" id="username" value={SignINvalues.email} onChange={Emailhandler} placeholder="Enter user Email" />
        </div>
        <div className="passWordField">
          <input type="password" id="password" value={SignINvalues.pass} onChange={passWordHandler} placeholder="Enter Password" />
        </div>
      </div>
      <div className="forgotPassword"><a href=''>Forgot password?</a></div>
      <button type='submit' id='SubmitBtn' onClick={handle} >Login</button>
      <div className="signUp"><Link to="/signup">Don't have account? <span>signUp</span></Link></div>

    </div>

  )
}
export default Authenticate;
