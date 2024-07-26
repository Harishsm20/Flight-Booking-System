import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        await axios.post('http://localhost:3001/auth/login', {email,password})

        .then(result=>{
            console.log(result)
            console.log(result.data)
            if(result.data.message === 'Success'){
                navigate('/app')
            }
        })
        
    };
    

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
    <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label htmlFor="email">
                    <strong>Email</strong>
                </label>
                <input type="email"
                placeholder='Enter Email'
                autoComplete='off' 
                name="email"
                className='form-control rounded-8'
                onChange={(e) => setEmail(e.target.value)}

                />
            </div>

            <div className="mb-3">
                <label htmlFor="email">
                    <strong>Password</strong>
                </label>
                <input type="password"
                placeholder='Enter Password'
                autoComplete='off' 
                name="email"
                className='form-control rounded-8'
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type='submit' className='btn btn-success w-100 rounded-0'>
                Login
            </button>
            <p>Don't Have an account</p>
            <Link to ="/register" className='btn btn-default border w-100 bg-success rounded-0 text-decoration-none'>
                Register
            </Link>

        </form>
    </div>
  
    </div>
    )
}

export default Login
