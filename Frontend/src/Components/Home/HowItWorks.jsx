import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage, MdPeople, MdSend } from 'react-icons/md'

function HowItWorks() {
  return (
    <>

  <div className="howitworks">
  <div className="container">
      <h3>How Job Zee work</h3>
      <div className="banner">
        <div className="card">
          <FaUserPlus/>
          <p>Create Account</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius reiciendis corrupti, quas dicta iure ipsam consequatur molestiae? Aliquam quo aut ut deserunt porro! Alias eius consectetur harum at quam repellendus!</p>
        </div>

        <div className="card">
          <MdFindInPage/>
          <p>Find a Job/Post a Job</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius reiciendis corrupti, quas dicta iure ipsam consequatur molestiae? Aliquam quo aut ut deserunt porro! Alias eius consectetur harum at quam repellendus!</p>
        </div>

        <div className="card">
          <MdPeople/>
          <p>Apply for Job</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius reiciendis corrupti, quas dicta iure ipsam consequatur molestiae? Aliquam quo aut ut deserunt porro! Alias eius consectetur harum at quam repellendus!</p>
        </div>




        
      </div>
    </div>
  </div>
    </>
  )
}

export default HowItWorks