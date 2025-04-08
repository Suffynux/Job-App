import React, { useContext ,useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import Home from './Components/Home/Home.jsx';
import Job from './Components/Job/Job.jsx';
import JobDetails from './Components/Job/JobDetails.jsx';
import MyJobs from './Components/Job/MyJobs.jsx';
import PostJob from './Components/Job/PostJob.jsx';
import Application from './Components/Application/Application.jsx';
import MyApplications from "./Components/Application/MyApplicatoins.jsx"
import NotFound from './Components/NotFound/NotFound.jsx';
import { Toaster } from "react-hot-toast";
import { Context } from './main.jsx';
import axios from "axios";
import Navbar from './Components/Layout/Navbar.jsx';
import Footer from './Components/Layout/Footer.jsx';


function App() {
  const {isAuthorized , setIsAuthorized , user , setUser} = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
    
        if (response.data.data) {  // ✅ Corrected access to user data
          setUser(response.data.data);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    
    fetchUser() 
  }, [isAuthorized])
  
  return (
    <BrowserRouter>
    <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Job Routes */}
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path='/job/' element={<Job />} />
        <Route path='/job/post' element={<PostJob />} />
        <Route path='/job/me' element={<MyJobs />} />

        {/* Application Routes */}
        <Route path='/application/:id' element={<Application />} />
        <Route path='/application/me' element={<MyApplications />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
