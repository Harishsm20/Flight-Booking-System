import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Signup from './Components/Authentication/signup'
import Login from './Components/Authentication/login'
import AApp from './Components/Authentication/app'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DisplayAirline from './Components/DisplayAirline/DisplayAirline'

function App() {
  // const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Login />} /> 
      <Route path='/register' element={<Signup />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/app' element={<AApp />} ></Route>
      <Route path='/airlines/destinations/:destination' element={<DisplayAirline />}></Route>
      
    </Routes>
   </BrowserRouter>
  )
}

export default App
