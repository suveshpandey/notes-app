import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';
import {validateEmail} from '../utils/helper.js';


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please enter the password.");
            return;
        }
        if(!name){
            setError("Please enter your name")
            return;
        }
        setError("");
    }
    return (
        <div className='h-[100%] w-[100%] flex items-center justify-center '>
            <div className='h-auto w-[400px]  bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 '>
                <form 
                action=""
                onSubmit={handleSubmit}
                className='w-[100%] h-[100%] flex flex-col p-5 transition-all duration-200 '>
                    <h4 className='text-2xl font-bold text-[#1d2d44] mb-3 '>SignUp</h4>
                    
                    <input 
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-[40px] w-[100%] outline-none rounded px-3 mb-3 text-[#1d2d44] text-lg border-[1px] border-[#1d2d44] border-opacity-30 hover:border-opacity-70  transition-all duration-200 ' />
                    
                    <PasswordInput 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <input 
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='h-[40px] w-[100%] outline-none rounded px-3 mb-3 text-[#1d2d44] text-lg border-[1px] border-[#1d2d44] border-opacity-30 hover:border-opacity-70  transition-all duration-200 ' />
                    

                    {error && <p className='text-red-600 mb-3'>{error}</p>}
                    
                    <button
                    type='submit' 
                    className='h-[40px] w-[100%] text-[#f0ebd8] font-semibold rounded mb-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 '>SignUp</button>
                    
                    <p 
                    className='text-md  text-[#1d2d44] text-center '>Already have an account? 
                    <Link 
                    to="/login" 
                    className='text-blue-600 underline'> Login
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;