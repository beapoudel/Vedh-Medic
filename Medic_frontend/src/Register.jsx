import { useState } from "react";
import { Route, Routes } from "react-router"
import App from "./App";

function Register(){
    const [username,setuser]=useState()
    const[email,setemail]=useState()
    const[password,setpass]=useState()
    const [pending,setpending]=useState(false)
    async function regis(){
      setpending(true)
  try{
    const url=" https://vedh-medic-backend.onrender.com/register/"
    let response= await fetch(url,{
      method:'POST',
      headers: {
    "Content-Type": "application/json"
  },
      body: JSON.stringify({username,email,password})
    })
    if(!response.ok){
      const errorData = await response.json();
    const firstKey = Object.keys(errorData)[0];   // e.g. "username"
  const firstMsg = errorData[firstKey][0];      // e.g. "Username is already taken"
  throw new Error(firstMsg);
    }
    const res = await response.json()
    alert("You are Register")
    window.location.href="/";
  }
  catch(err){
     alert(err.message)
     setpending(false)
  }
 }
    return(
        <div><div className="login">
                <h1 style={{color:'white', backgroundColor:'rgb(20, 161, 196)', textAlign:'center', borderRadius:'15px'}}> <img src='https://cdn-icons-png.flaticon.com/128/3004/3004458.png'/> Vedh Medic</h1>
                <h2 style={{textAlign:'center'}}>Register Yourself </h2>
                <div style={{display:'grid'}}>
                <input onChange={(event)=>setuser(event.target.value)} className='loginput' type='text' placeholder='Enter the username'/>
                 <input onChange={(event)=>setemail(event.target.value)} className='loginput' type='email' placeholder='Enter the email'/>
                <input onChange={(event)=>setpass(event.target.value)} className='loginput' type='password' placeholder='Enter the password'/>
                {!pending&&
                    <button onClick={regis} className='Loginbutton'>Register</button>
                }
                {
                  pending&&
                  <button  className='Loginbutton'>Please Wait...</button>
                }
                </div>
             </div>
             </div>
    )
}   
export default Register
