import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const TagInput = ({ tags = [], setTags }) => {
    const [inputValue, setInputValue] = useState("");

    // Ensure `tags` is always an array
    const safeTags = Array.isArray(tags) ? tags : [];

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...safeTags, inputValue.trim()]); // Append new tag
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(safeTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {
                tags?.length > 0 && (
                    <div className='flex items-center flex-wrap gap2 my-2 mb-3 '>
                        {tags.map((tag, index) => (
                            <span key={index} className='bg-slate-200 rounded-sm px-1 bg-opacity-50 text-blue-500 flex mr-1' >
                                # {tag}
                                <button onClick={() => {handleRemoveTag(tag)}}><RxCross2 className='text-red-400 text-opacity-30 hover:text-opacity-100 transition-all duration-200' /></button>
                            </span>
                        ))}
                    </div>
                )
            }
            <div className='flex items-center space-x-1 mb-2'>
                <input
                type="text" 
                placeholder='#meeting'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className='px-2 py-1 h-[30px] w-[200px] my-1 rounded-sm border-[1px] border-slate-400 border-opacity-40 outline-none text-[#1d2d44] '
                />
                <button
                onClick={() => {addNewTag()}}
                ><IoMdAdd className='text-blue-600 size-8 hover:border  hover:border-blue-600 hover:bg-slate-200 rounded-sm transition-all duration-300 ease-in-out '  /></button>
            </div>
        </div>
    );
};

export default TagInput;
