import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import PasswordInput from '../components/Passwordinput';
import {url, validateEmail} from '../utils/helper.js';
import NavbarForSignupin from '../components/NavbarForSignupin.jsx';


const ChangePass = ({email, setEmail, password, setPassword}) => {
    const [error, setError] = useState("");

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

        try{
            const response = await fetch(`${url}/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, "newPassword": password})
            });
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("token", data.token);
                localStorage.setItem("email",data.email);
                alert("Password changed successfullly.");
                navigate("/dashboard");
            }
            else{
                setError(data.message || "Failed to change password.");
            }
        }
        catch(error){
            console.log("error: ", error.message);
        }
    }
    return (
        <div className='h-[100%] w-[100%] flex items-center justify-center '>
            <NavbarForSignupin />
            <div className='h-auto sm:w-[400px] w-[90%]   bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 '>
                <form 
                action=""
                onSubmit={handleSubmit}
                className='w-[100%] h-[100%] flex flex-col p-5 transition-all duration-200 '>
                    <h4 className='text-2xl font-bold text-[#1d2d44] mb-3 '>Change Password</h4>
                    
                    <input 
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-[40px] w-[100%] outline-none rounded px-3 mb-3 text-[#1d2d44] text-lg border-[1px] border-[#1d2d44] border-opacity-30 hover:border-opacity-70  transition-all duration-200 ' />
                    
                    <PasswordInput 
                    value={password}
                    placeholder={"New password"}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-600 mb-3'>{error}</p>}
                    
                    <button 
                    type='submit'
                    className='h-[40px] w-[100%] text-[#f0ebd8] font-semibold rounded mb-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 '>Change</button>
                    
                    <p 
                    className='text-md  text-[#1d2d44] text-center '>Or
                    <Link 
                    to="/signup" 
                    className='text-blue-600 underline'> Sign-up with another email.
                    </Link>
                    </p>
                
                </form>
            </div>
        </div>
    )
}

export default ChangePass
