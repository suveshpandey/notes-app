import React, { useState } from 'react'
import { getInitials } from '../utils/helper'
import SearchBar from './SearchBar'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("handleSearch called!")
    }
    const onClearSearch = () => {
        setSearchQuery("");
    }
    return (
        <div className='bg-[#eaf4f4] w-[100%] h-[50px] fixed flex items-center justify-between sm:px-20 px-2 py-1 top-0 z-10 '>
            <div className='font-bold text-lg bg-gradient-to-r from-[#1d2d44] to-[#3e5c76] bg-clip-text text-transparent  '>NeuraNotes</div>
            <SearchBar value={searchQuery} onChange={({target}) => {setSearchQuery(target.value)}} handleSearch={handleSearch} onClearSearch={onClearSearch} />
            <div className='bg-slate-300 sm:size-10 size-8 flex items-center justify-center rounded-full my-1 font-semibold'>{getInitials("Suvesh Pandey")}</div>
        </div>
    )
}

export default Navbar
