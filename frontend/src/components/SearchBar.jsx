import React from 'react'

import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
    return (
        <div className='md:w-[50%] lg:w-[30%] sm:h-[80%] h-[70%] flex items-center rounded-md  px-2 text-[#1d2d44] text-opacity-70 border-[1px] bg-white  '>
            <input 
            type="text"
            placeholder='Search Notes'
            className='h-[100%] w-[100%] rounded-md outline-none  '
            value={value}
            onChange={onChange}
            />
            {value && <RxCross2 onClick={onClearSearch} className='size-5 cursor-pointer mr-1 hover:text-slate-800 transition-all duration-300 ' />}
            <IoMdSearch onClick={handleSearch} className='size-5 cursor-pointer hover:text-slate-800 transition-all duration-300 ' />
        </div>
    )
}

export default SearchBar
