import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPass, setIsShowPass] = useState(false);
    const toggleIsShowPass = () => {
        setIsShowPass(!isShowPass)
    }
    return (
        <div className=' h-[40px] w-[100%] grid grid-cols-[90%_auto] items-center rounded pl-3 mb-3 text-[#1d2d44] text-lg border-[1px] border-[#1d2d44] border-opacity-30 hover:border-opacity-70  transition-all duration-200 '>
            <input 
            value={value}
            onChange={onChange}
            type={isShowPass ? "text" : "password"}
            placeholder={placeholder || "Password"}
            className='h-[100%] w-[100%] outline-none pr-3 ' />
            {isShowPass ? <FaRegEyeSlash onClick={toggleIsShowPass} className='text-[#3e5c76] ' /> : <FaRegEye onClick={toggleIsShowPass} className='text-[#3e5c76] ' />}
        </div>
    )
}

export default PasswordInput
