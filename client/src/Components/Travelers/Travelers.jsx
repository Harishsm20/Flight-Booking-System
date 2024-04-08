import React,{useEffect} from 'react'

//import destination images
import paris from '../../assets/paris.jpg'
import london from '../../assets/london.jpg'
import newyork from '../../assets/newyork.jpg'
import dubai from '../../assets/dubai.jpg'


//import user images
import traveler1 from '../../assets/user1.jpg'
import traveler2 from '../../assets/user2.jpg'
import traveler3 from '../../assets/user3.jpg'
import traveler4 from '../../assets/user4.jpg'



// Import aos ===============>>

import Aos from 'aos'
import 'aos/dist/aos.css'


//We are going to use high order arry method called Map to display all the data
const travelers =[
  {
    id:1,
    destinationImage: paris,
    travelerImage: traveler1,
    travelerName: 'Kelly Wakasa',
    socialLink:'@kellywakasa'
  },
  {
    id:2,
    destinationImage: dubai,
    travelerImage: traveler2,
    travelerName: 'Ashley',
    socialLink:'@aaashleyk'
  },
  {
    id:3,
    destinationImage: london,
    travelerImage: traveler3,
    travelerName: 'Amber Alexander',
    socialLink:'@_amberalexander'
  },
  {
    id:4,
    destinationImage: newyork,
    travelerImage: traveler4,
    travelerName: 'Luke Eich',
    socialLink:'@luke_eich'
  }

]


const Travelers = () => {

  
  // UseEffect to set animtion
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])


  return (
    <div className='travelers container section'>
      <div className="sectionContainer">
        <h2 data-aos='fade-down' data-aos-duration='2500'>
          Top travelers of this month!
        </h2>



        <div className="travelersContainer grid">
          {
            travelers.map(({id,destinationImage,travelerImage,travelerName,socialLink})=>{
              return(
                // Single passenger card 

                <div key={id} className="singleTraveler" data-aos='fade-up' data-aos-duration='2500'>

                  <img src={destinationImage} className='destinationImage'/>
      
                  <div className="travelerDetails">
                    <div className="travelerPicture">
                      <img src={travelerImage} className='travelerImage'/>
                    </div>
                    <div className="travelerName">
                      <span>{travelerName}</span>
                      <p>{socialLink}</p>
                    </div>
                  </div>  
                </div>
              )
            })
          }
        </div>

      </div>
      
    </div>
  )
}

export default Travelers
