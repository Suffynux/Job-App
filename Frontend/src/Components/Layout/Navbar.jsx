import React, { useState, useContext } from 'react'
import { Context } from '../../main.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Navbar() {
  const [show , setShow] = useState(false)
  const {isAuthorized , setIsAuthorized , user , setUser} = useContext(Context)
  const navigateTo = useNavigate()
  
  const handleLogout = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout" , {withCredentials : true})
      toast.success(response.data.user)
      setIsAuthorized(false)
      navigateTo("/login")
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthorized(true)
    }y
  }
  return (
    <></>
  )
}

export default Navbar