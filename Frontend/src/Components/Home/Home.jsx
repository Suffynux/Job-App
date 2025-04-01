import React, {useContext ,useEffect, useState} from 'react'
import { Context } from '../../main.jsx'
import { Navigate } from 'react-router-dom';
import Hero from './Hero.jsx';
import HowItWorks from './HowItWorks.jsx'
import PopularCategories from './PopularCategories.jsx';
import PopularCompanies from './PopularCompanies.jsx';

function Home() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  if(!isAuthorized) {
    return <Navigate to={"/login"}/>
  }

  return (
    <section className='homepage page'>
      <Hero/>
      <HowItWorks/>
      <PopularCategories/>
      <PopularCompanies/>


    </section>
  )
}

export default Home