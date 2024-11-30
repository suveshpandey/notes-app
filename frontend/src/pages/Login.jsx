import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';
import {validateEmail} from '../utils/helper.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please enter the password.");
            return;
        }
        setError("");

        // login api call
        try{
            const response = await fetch("http://localhost:3000/user/signin", {
                method: "POST",
                headers: {
                    body: JSON.stringify({
                        email, password
                    })
                }
            });
            if(response.ok){
                console.log("response: ", response);
                alert("sign-in done!");
                navigate("/dashboard");
            }
        }
        catch(error){
            console.log("error: ", error.message);
            alert("Couldn't sign-in")
        }
    }
    
    return (
        <div className='h-[100%] w-[100%] flex items-center justify-center '>
            <div className='h-auto w-[400px]  bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 '>
                <form 
                action=""
                onSubmit={handleSubmit}
                className='w-[100%] h-[100%] flex flex-col p-5 transition-all duration-200 '>
                    <h4 className='text-2xl font-bold text-[#1d2d44] mb-3 '>Login</h4>
                    
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

                    {error && <p className='text-red-600 mb-3'>{error}</p>}
                    
                    <button 
                    type='submit'
                    className='h-[40px] w-[100%] text-[#f0ebd8] font-semibold rounded mb-2 bg-[#0077b6] hover:bg-[#1d2d44] transition-all duration-200 '>Login</button>
                    
                    <p 
                    className='text-md  text-[#1d2d44] text-center '>Don't have an account? 
                    <Link 
                    to="/signup" 
                    className='text-blue-600 underline'> Sign-up
                    </Link>
                    </p>
                
                </form>
            </div>
        </div>
    )
}
export default Login;
