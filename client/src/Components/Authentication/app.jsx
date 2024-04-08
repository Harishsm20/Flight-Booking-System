import React from 'react'
import '../../main.css'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Search from '../Search/Search'
import Support from '../Support/Support'
import Info from '../Info/Info'
import Lounge from '../Lounge/Lounge'
import Travelers from '../Travelers/Travelers'
import Subscribe from '../Subscribers/Subscribe'
import Footer from '../Footer/Footer'


const AApp = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Search/>
      <Support/>
      <Info/>
      <Lounge/>
      <Travelers/>
      <Subscribe/>
      <Footer/>
  
    </div>
  )
}

export default AApp
