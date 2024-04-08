import React,{useEffect} from 'react'

//imported assets ==================>>
import video from '../../assets/video.mp4'
import aeroplane from '../../assets/takeoff.png'  


// Import aos ===============>>

import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {

  // UseEffect to set animtion
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])



  return (
    <div className='home flex contaibner'>
      <div className="mainText">
        <h1  data-aos='fade-up' data-aos-duration='2500'>Create Ever-lasting Memories With Us</h1>
      </div>
      
      <div className="homeImages flex" data-aos='fade-down' data-aos-duration='2500'>
         <div className="videoDiv">
          <video src={video} autoPlay muted loop className='video'> </video>
         </div>

         <img src={aeroplane} className='plane'/>
      </div>
    </div>
  )
}

export default Home
