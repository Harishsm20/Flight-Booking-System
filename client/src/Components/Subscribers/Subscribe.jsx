import React,{useEffect} from 'react'


// Import aos ===============>>

import Aos from 'aos'
import 'aos/dist/aos.css'

const Subscribe = () => {

  
  // UseEffect to set animtion
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])


  return (
    <div className='subscribe section'>
      <div className="sectionContainer container" data-aos='fade-up' data-aos-duration='2500'>
        <h2> Subscribe Newsletters & get latest News</h2>
        <div className="inputDiv flex">
          <input type="text" placeholder='Enter your email address' />
          <button className='btn'>Subscribe</button>
        </div>
      </div>
      
    </div>
  )
}

export default Subscribe
