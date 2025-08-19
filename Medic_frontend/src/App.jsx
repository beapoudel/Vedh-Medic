import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chat from './chat'
import Report from './report'
import Register from './Register'
import './App.css'
import { NavLink,Route, Routes } from 'react-router'

function App() {
  const [chnage,setchange] = useState(true)
  const [log,setlog]=useState(0)
  const [username,setusername]=useState()
  const [password,setpassword]=useState()
  const[use,setuse]=useState()
  const [pending,setpending]=useState(false)
 async function login(){
  setpending(true)
  try{
    const url=" https://vedh-medic-backend.onrender.com/login/"
    let response= await fetch(url,{
      method:'POST',
      headers: {
    "Content-Type": "application/json"
  },
      body: JSON.stringify({username,password})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    if(res==false){
      alert("Wrong Username or Password")
      setpending(false)
      return
    }
    setuse(res.username)
    localStorage.setItem("authtoken",res.token)
    setlog(2)
  }
  catch(err){
    console.log(err)
  }
 }
  return (
    <div>
      <h1><img className='h1_img' src='https://cdn-icons-png.flaticon.com/128/3004/3004458.png'/>Vedh Medic</h1>
      <h3>Your Personal AI health Assistant</h3>
      <div className='contain'>
        {
          log==0 &&
        <div className="login">
                <h1 style={{color:'white', backgroundColor:'rgb(20, 161, 196)', textAlign:'center', borderRadius:'15px'}}> <img src='https://cdn-icons-png.flaticon.com/128/3004/3004458.png'/> Vedh Medic</h1>
                <h2 style={{textAlign:'center'}}>Login Your account</h2>
                <div style={{display:'grid'}}>
                <input onChange={(event)=>setusername(event.target.value)} className='loginput' type='text' placeholder='Enter the username'/>
                <input onChange={(event)=>setpassword(event.target.value)} className='loginput' type='password' placeholder='Enter the password'/>
                { !pending&&
                  <button onClick={login} className='Loginbutton'>Login</button>}
                  { pending&&
                  <button  className='Loginbutton'>Please Wait...</button>}
               
                </div>
                { <h4 style={{textAlign:'center', paddingBottom:'10%'}}>Don't have a account?<NavLink onClick={()=>setlog(1)}  to={"/register"}>Register</NavLink></h4> }
             </div>
          }
          <Routes>
            <Route path='/register' element={<Register/>}/>
          </Routes>
          {
            log==2 &&
        <Routes>
          <Route index element={<Chat username={use}/>} />
          <Route path='/report' element={<Report username={use} />}/>
        </Routes>
          }
        {
          log==2 &&
        <div className='foot'>
         <NavLink to={"/"}><img  className='foot_img' src='https://cdn-icons-png.flaticon.com/128/1041/1041916.png'/></NavLink> 
         <NavLink to={"/report"}><img  className='foot_img' src='https://cdn-icons-png.flaticon.com/128/12237/12237054.png'/></NavLink>
        </div>
}
      </div>
    </div>
  )
}
export default App
