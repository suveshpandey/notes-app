import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';
import {url, validateEmail} from '../utils/helper.js';
import NavbarForSignupin from '../components/NavbarForSignupin.jsx';
import LoadingBar from '../components/Loader.jsx';


const Signup = ({username, setUsername, email, setEmail, password, setPassword}) => {
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please enter the password.");
            return;
        }
        if(!username){
            setError("Please enter your name")
            return;
        }
        setError("");
        
        //sign-up api call
        try{
            const response = await fetch(`${url}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, username
                })
            });
            if(response.ok){
                console.log("response: ", response);
                setMessage("A verification code is sent to you email.");
                setLoader(true);
                setTimeout(() => {
                    setLoader(false);
                    navigate("/verification");
                }, 5000);
            }
            else if(response.status == 401){
                setError("Email already exists, Please login.")
                return;
            }
        }
        catch(error){
            console.log("error: ", error.message);
            alert("Couldn't sign-up")
        }
    }
    return (
        <div className="h-[100%] w-[100%] flex items-center justify-center ">
            <NavbarForSignupin />
            {loader && <LoadingBar message={message} />}
            <div className="h-auto w-[400px]  bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 ">
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
