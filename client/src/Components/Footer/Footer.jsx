import React,{useEffect} from 'react'

// Import icons
import {TiSocialFacebook} from 'react-icons/ti'
import {FaPinterestP} from 'react-icons/fa'
import {AiFillYoutube} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'

//Import imgaes ===========>>
import logo from '../../assets/logo.png'


// Import aos ===============>>

import Aos from 'aos'
import 'aos/dist/aos.css'


const Footer = () => {

  
  // UseEffect to set animtion
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])



  return (
    <div className='footer'>
      <div className="sectionContainer container grid" >
        <div data-aos='fade-up' data-aos-duration='2500' className="gridOne">
            <div className="logoDiv">
              <img src={logo} className='logo' />
            </div>
            <p>Your mind should be stronger than your feelings, fly!</p>
            <div className="socialIcon flex">
              <TiSocialFacebook className='icon'/>
              <AiOutlineTwitter className='icon'/>
              <AiFillYoutube className='icon'/>
              <FaPinterestP className='icon'/>
            </div>
          </div>


          <div className="footerLinks" data-aos='fade-up' data-aos-duration='2500'>
            <span className="linkTitle">Information</span>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Explore</a>
            </li>
            <li>
              <a href="">Flight Status</a>
            </li>
            <li>
              <a href="">Travel</a>
            </li>
            <li>
              <a href="">Check-In</a>
            </li>
            <li>
              <a href="">Manage your booking</a>
            </li>
    
          </div>


          <div className="footerLinks" data-aos='fade-up' data-aos-duration='3500'>
            <span className="linkTitle">Quick Guide</span>
            <li>
              <a href="">FAQ</a>
            </li>
            <li>
              <a href="">How to</a>
            </li>
            <li>
              <a href="">Features</a>
            </li>
            <li>
              <a href="">Baggage</a>
            </li>
            <li>
              <a href="">Route Map</a>
            </li>
            <li>
              <a href="">Our communities</a>
            </li>
    
          </div>


          <div className="footerLinks"data-aos='fade-up' data-aos-duration='4500'>
            <span className="linkTitle">Information</span>
            <li>
              <a href="">Chauffer</a>
            </li>
            <li>
              <a href="">Our Partners</a>
            </li>
            <li>
              <a href="">Destination</a>
            </li>
            <li>
              <a href="">Careers</a>
            </li>
            <li>
              <a href="">Transportation</a>
            </li>
            <li>
              <a href="">Programme Rules</a>
            </li>
    
          </div>


      </div>
       

       <div className="copyRightDiv flex">
        <p>Courtesy Design | Developed by <a href="https://emailto-harish.it22@bitsathy.ac.in" target='_blank'>Harish</a></p>
       </div>
    </div>
  )
}

export default Footer
