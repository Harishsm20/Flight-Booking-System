import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password, // Assuming you have a password field in your server-side model
      });

      console.log(response.data); // Handle successful registration response
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      console.error(error);
      alert('Error registering employee:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder='Enter Name'
              autoComplete='off'
              name="name"
              className='form-control rounded-8'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder='Enter Email'
              autoComplete='off'
              name="email"
              className='form-control rounded-8'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder='Enter Password'
              autoComplete='off'
              name="password"
              className='form-control rounded-8'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Register
          </button>
          <p>Already Have an account</p>
          <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;












// import React from 'react'
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'


// function Signup() {

//     const [name,setName] = useState()
//     const [email,setemail] = useState()
//     const [password,setpassword] = useState()
//     const navigate = useNavigate()

//     const handleSubmit = (value)=>{
//         value.preventDefault()
//         axios.post('http://localhost:3001/register', {name, email, password})
//         .then(result => {console.log(result)
//         navigate('/login')})
//         .catch(err => console.log(err))
//     }

//   return (
//     <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
//         <div className="bg-white p-3 rounded w-25">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email">
//                         <strong>Name</strong>
//                     </label>
//                     {/* <input type="text"
//                     placeholder='Enter Name'
//                     autoComplete='off' 
//                     name="email"
//                     className='form-control rounded-8'
//                     onChange={(e)=> setName(e.target.value)}
//                     //The value of entered input will be sent to the onchange function and the input value will be assigned to e
//                     /> */}

//                     <input type="text"
//                     placeholder='Enter Name'
//                     autoComplete='off' 
//                     name="name" // Updated to "name"
//                     className='form-control rounded-8'
//                     onChange={(e)=> setName(e.target.value)}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="email">
//                         <strong>Email</strong>
//                     </label>
//                     {/* <input type="email"
//                     placeholder='Enter Email'
//                     autoComplete='off' 
//                     name="email"
//                     className='form-control rounded-8'
//                     onChange={(value)=> setemail(value.target.value)}
//                     /> */}

//                     <input type="email"
//                     placeholder='Enter Email'
//                     autoComplete='off' 
//                     name="email" // Updated to "email"
//                     className='form-control rounded-8'
//                     onChange={(value)=> setemail(value.target.value)}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="email">
//                         <strong>Password</strong>
//                     </label>
//                     {/* <input type="password"
//                     placeholder='Enter Password'
//                     autoComplete='off' 
//                     name="email"
//                     className='form-control rounded-8'
//                     onChange={(value)=> setpassword(value.target.value)}
//                     /> */}
//                     <input type="password"
//                     placeholder='Enter Password'
//                     autoComplete='off' 
//                     name="password" // Updated to "password"
//                     className='form-control rounded-8'
//                     onChange={(value)=> setpassword(value.target.value)}
//                     />
//                 </div>

//                 <button type='submit' className='btn btn-success w-100 rounded-0'>
//                     Register
//                 </button>
//                 <p>Already Have an account</p>
//                 <Link to ="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
//                     Login
//                 </Link>

//             </form>
//         </div>
      
//     </div>
//   )
// }

// export default Signup
