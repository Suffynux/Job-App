import React, { useState, useContext } from 'react'
import { Context } from '../../main.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
  const [show , setShow] = useState(false)
  const {isAuthorized , setIsAuthorized , user , setUser} = useContext(Context)
  const navigateTo = useNavigate()
  
  const handleLogout = async()=>{
    try {
      const response = await axios.get("" , {withCredentials : true})
    } catch (error) {
      
    }y
  }
  return (
    <></>
  )
}

export default Navbar