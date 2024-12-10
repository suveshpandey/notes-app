import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';
import {url, validateEmail} from '../utils/helper.js';
import NavbarForSignupin from '../components/NavbarForSignupin.jsx';
import LoadingBar from '../components/Loader.jsx';

const Login = ({username, setUsername, email, setEmail, password, setPassword}) => {
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [isForgotPass, setIsForgotPass] = useState(false);

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleForgotPass = () => {
        setPassword("");
        navigate('/change-pass');
    }
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
            const response = await fetch(`${url}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if(response.ok && data.token){
                setUsername(data.username);
                localStorage.setItem("token",data.token);

                localStorage.setItem("username",data.username);
                localStorage.setItem("email",data.email);
                setMessage("Successfully Signed In!");
                setLoader(true);
                setTimeout(()=> {
                    setLoader(false);
                    navigate("/dashboard");
                }, 3000);
                
            }
            else{
                setError(data.message || "Failed to sign-in.");
            }
        }
        catch(error){
            console.log("error: ", error.message);
            alert("Couldn't sign in. Please try again later.");
        }
    }
    
    return (
        <div className="h-[100%] w-[100%] flex items-center justify-center  ">
            <NavbarForSignupin />
            {loader && <LoadingBar message={message} />}
            <div className="h-auto w-[400px]  bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 ">
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

                    {isForgotPass && 
                    <PasswordInput 
                    value={newPassword}
                    placeholder={"New Password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />}
                    <p onClick={handleForgotPass} className='text-right  mb-1 opacity-50 hover:opacity-70 cursor-pointer'>forgot password?</p>

                    {error && <p className='text-red-600 mb-3'>{error}</p>}
                    
                    <button 
                    type='submit'
                    className='h-[40px] w-[100%] text-[#f0ebd8] font-semibold rounded mb-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 '>Login</button>
                    
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
