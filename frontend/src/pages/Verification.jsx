import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Verification = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!verificationCode || verificationCode.length < 6 || verificationCode.length > 6){
            setError("Please enter valid code.");
            return;
        }
        setError("");

        try{
            const response = await fetch("http://localhost:3000/user/verify-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({verificationCode})
            })
            const data = await response.json();
            if(response.ok){
                alert("email verified.");
                navigate("/login");
            }
            else if(response.status == 404){
                setError("Either email or code is wrong.");
            }
            else{
                setError("Failed to verify.");
            }
        }
        catch(error){
            alert("Couldn't verify.")
        }

    }
    return (
        <div className='h-[100%] w-[100%] flex items-center justify-center '>
            <div className='h-auto w-[400px]  bg-opacity-20 rounded-md  border-[1px] border-[#748cab] border-opacity-200 '>
                <form 
                action=""
                onSubmit={handleSubmit}
                className='w-[100%] h-[100%] flex flex-col p-5 transition-all duration-200 '>
                    
                    
                    <input 
                    type="text" 
                    placeholder='Verification Code'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className='h-[40px] w-[100%] outline-none text-center rounded px-3 mb-3 text-[#1d2d44] text-lg border-[1px] border-[#1d2d44] border-opacity-30 hover:border-opacity-70  transition-all duration-200 ' />
                    
                    {error && <p className='text-red-600 mb-3'>{error}</p>}
                    
                    <button
                    type='submit' 
                    className='h-[40px] w-[100%] text-[#f0ebd8] font-semibold rounded mb-2 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-200 '>Verify</button>
                    
                    <p
                    className='text-md  text-[#1d2d44] text-center '>Didn't get verification code? 
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

export default Verification
