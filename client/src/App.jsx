import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Signup from './Components/Authentication/signup'
import Login from './Components/Authentication/login'
import AApp from './Components/Authentication/app'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Login />} />
      <Route path='/register' element={<Signup />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/app' element={<AApp />} ></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
