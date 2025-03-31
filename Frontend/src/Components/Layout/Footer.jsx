import React from 'react'
import { useContext ,useEffect } from 'react'
import { Context } from '../main.jsx';
import {FaFacebook , FaLinkedinIn , FaYoutube} from "react-icons/fa"
import {RiInstagramLine} from "react-icons/ri"
import { Link } from 'react-router-dom';
import "./App.css";
const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);


function Footer() {
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Right Reserved By Code with zeeshu</div>
      <div>
        <Link to={"/"} target='_blank'><FaFacebook/></Link>
        <Link to={"/"} target='_blank'><FaLinkedinIn/></Link>
        <Link to={"/"} target='_blank'><FaYoutube/></Link>
        <Link to={"/"} target='_blank'><RiInstagramLine/></Link>
      </div>
    </footer>
  )
}

export default Footer