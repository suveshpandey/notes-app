import React, { useState } from 'react'
import Modal from "react-modal"
import { getInitials, getFirstName } from '../utils/helper'
import SearchBar from './SearchBar'
import {useNavigate} from "react-router-dom"

import { FaCircleUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";


const Navbar = ({notes, username, email, password, setEmail, setPassword, setUsername, notesLength, setSearchQuery}) => {
    const [searchQueryLocal, setSearchQueryLocal] = useState("");
    const [isModelOpen, setIsModelOpen] = useState(false);

    const usernameFromLocalStorage = localStorage.getItem("username");
    const emailFromLocalStorage = localStorage.getItem("email");

    const navigate = useNavigate();

    const handleSearch = () => {
        setSearchQuery(searchQueryLocal);
    };
    const onClearSearch = () => {
        setSearchQuery('');
        setSearchQueryLocal('');
    };
    const handleOpenModel = () =>{
        setIsModelOpen(true);
    }
    const handleCloseModel = () => {
        setIsModelOpen(false);
    }
    const getGreeting = () => {
        const currHour = new Date().getHours();

        if(currHour < 12) return "Good Morning";
        else if(currHour < 17) return "Good Afternoon";
        else if(currHour < 21) return "Good Evening";
        else return "Hello";
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        setEmail("");
        setPassword("");
        setUsername("");
        
        navigate("/login");
    }

    return (
        <div>
            <div className='bg-[#eaf4f4] w-[100%] h-[50px] fixed flex items-center justify-between sm:px-20 px-2 py-1 top-0 z-10 '>
                <div className='flex justify-center items-center font-bold text-lg bg-gradient-to-r from-[#1d2d44] to-[#3e5c76] bg-clip-text text-transparent  '>
                    <img className='sm:size-6 size-5 mr-1' src="/notes-icon.png" alt="" />
                    <p>NeuraNotes</p>
                </div>
                
                <SearchBar 
                value={searchQueryLocal} 
                onChange={({target}) => {
                    setSearchQueryLocal(target.value);
                }} 
                handleSearch={handleSearch} 
                onClearSearch={onClearSearch} 
                />

                <div 
                onClick={handleOpenModel}
                className='bg-slate-300 hover:bg-gray-300 sm:size-10 size-8 text-xs sm:text-base flex items-center justify-center rounded-full my-1 font-semibold cursor-pointer '>
                {getInitials(username || usernameFromLocalStorage).toUpperCase()}
                </div>
            </div>

            {/* Modal */}
            <Modal
            isOpen={isModelOpen}
            onRequestClose={handleCloseModel}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            className={"lg:w-[40%] w-[95%] sm:h-3/4 h-[80vh] mx-auto  mt-16 bg-[#eef4ed] rounded-md p-6  transition-all duration-200"}
            >
                <div className='flex flex-col relative h-full'>
                    <button
                    onClick={handleCloseModel}
                    className='absolute right-2'>
                    <RxCross2 className='text-slate-500 size-5 hover:text-red-400 transition-all duration-300' />
                    </button>
                    <div className=' flex flex-col items-center justify-center'>
                        <FaCircleUser className='size-20 text-blue-600' />
                        <h1 className='text-[#22223b] text-2xl font-semibold text-opacity-50 mt-3 '>{getGreeting()} <span className='bg-gradient-to-r from-[#14213d] to-[#4a4e69] bg-clip-text text-transparent opacity-80 '>{getFirstName(username) || getFirstName(usernameFromLocalStorage)}</span></h1>
                        <h1 className='text-center text-lg w-[70%] text-[#22223b] text-opacity-50 font-semibold mt-2'>You've saved  <span className=' text-blue-500'>{notesLength}</span> notes.</h1>
                        <div className='h-[1px] bg-[#4a4e69] w-[90%] mt-3 bg-opacity-30 '></div>
                    </div>
                    <div className='flex flex-col justify-center items-center pt-10'>
                        <h1 className='text-center text-lg border-b-2 w-[70%] text-[#22223b] font-semibold '>Email: <span className='font-normal'>{email || emailFromLocalStorage}</span></h1>
                        <h1 className='text-center text-lg border-b-2 w-[70%] text-[#22223b] font-semibold mt-2'>Username: <span className='font-normal'>{username || usernameFromLocalStorage}</span></h1>
                        <h1 className='text-center text-lg w-[70%] text-[#22223b] font-semibold mt-2'>Password: <span className='font-normal'>{password || "________"}</span></h1>
                        <div className='h-[1px] bg-[#4a4e69] w-[90%] mt-3 bg-opacity-30 '></div>
                    </div>
                    <div className='flex justify-center'>
                        <button 
                        onClick={handleLogout}
                        className='h-[30px] w-[30%] mt-10 text-white rounded-md flex justify-center items-center bg-gradient-to-r from-[#6d7293] to-[#7c98b3] transition-all duration-200 '>Logout <TbLogout className='ml-1' /> </button>
                    </div>
                    <div className='mt-auto flex justify-center items-center pb-4'>
                        <p className="text-sm text-center text-gray-500">Designed and developed by <br /><span className='text-blue-500 text-center'>"Suvesh Pandey" </span></p>
                    </div>
                </div>
            </Modal>
        </div>
        
    )
}

export default Navbar
