import React from 'react'

import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
    return (
        <div className='md:w-[50%] lg:w-[30%] w-[170px] sm:h-[80%] h-[70%] flex items-center rounded-md  px-2 text-[#1d2d44] text-opacity-70 border-[1px] bg-white  '>
            <input 
            type="text"
            placeholder='Search Notes'
            className='h-[100%] w-[100%] rounded-md outline-none  '
            value={value}
            // onChange={onChange}
            onChange={(e) => {
                onChange(e); // Pass the value to parent for handling
                if (e.target.value === '') {
                    handleSearch(); // Reset the notes when the search query is cleared
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(); // Call the search function when Enter is pressed
                }
            }}
            />
            {value && <RxCross2 onClick={onClearSearch} className='size-5 cursor-pointer mr-1 hover:text-slate-800 transition-all duration-300 ' />}
            <IoMdSearch onClick={handleSearch} className='size-5 cursor-pointer hover:text-slate-800 transition-all duration-300 ' />
        </div>
    )
}

export default SearchBar
