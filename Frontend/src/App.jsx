import React, { useContext , useEffect } from 'react'
import "./App.css"
import { Context } from './main.jsx'
import axios from "axios";
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import Navbar from './Components/Layout/Navbar.jsx';
import Footer from './Components/Layout/Footer.jsx';
import Home from './Components/Home/Home.jsx';
import Job from './Components/Job/Job.jsx';
import JobDetails from './Components/Job/JobDetails.jsx';
import MyJobs from './Components/Job/MyJobs.jsx';
import PostJob from './Components/Job/PostJob.jsx';
import Application from './Components/Application/Application.jsx';
import MyApplicatoins from './Components/Application/MyApplicatoins.jsx';
import ResumeModel from './Components/Application/ResumeModel.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import {Toaster} from "react-hot-toast"
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
function App() {
  return (
    <>    
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/job/getalljobs' element={<JobDetails/>}/>
        <Route path='/job/:id' element={<Job/>}/>
        <Route path='/job/post' element={<PostJob/>}/>
        <Route path='/job/me' element={<MyJobs/>}/>

        <Route path='/application/:id' element={<Application/>}/>
        <Route path='/application/me' element={<MyApplicatoins/>}/>

        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App