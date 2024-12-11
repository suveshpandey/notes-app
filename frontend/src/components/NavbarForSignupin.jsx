import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const NavbarForSignupin = () => {
    return (
            <div className='bg-[#eaf4f4] w-[100%] h-[50px] fixed flex items-center justify-between sm:px-20 px-2 py-1 top-0 z-10 '>
                <div className='flex justify-center items-center font-bold text-lg bg-gradient-to-r from-[#1d2d44] to-[#3e5c76] bg-clip-text text-transparent  '>
                    <img className='sm:size-6 size-5 mr-1' src="/notes-icon.png" alt="" />
                    <p>NeuraNotes</p>
                </div>
                <FaCircleUser className='sm:size-10 size-8 text-slate-400' />
            </div>
    )
}

export default NavbarForSignupin
