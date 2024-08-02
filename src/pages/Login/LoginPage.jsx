import React from 'react'
import { useEffect } from 'react'
const LoginPage = () => {
  useEffect(()=>{
    document.title= "TaskVibe | Login";
},[])
  
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage