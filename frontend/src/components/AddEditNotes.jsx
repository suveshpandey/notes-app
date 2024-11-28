import React, { useEffect, useState } from 'react';
import TagInput from './TagInput';

import { RxCross2 } from "react-icons/rx";

const AddEditNotes = ({ onClose, onSave, initialData }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setTags(initialData.tags || []); // Use the array directly
            setDate(initialData.date || new Date().toISOString().split('T')[0]);
        } else {
            // Reset fields for add mode
            setTitle('');
            setContent('');
            setTags([]); // Initialize as an empty array
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [initialData]);
    
    
    // Save handler
    const handleSave = () => {
        if (!title || !content) {
            alert("Title and content cannot be empty!");
            return;
        }

        const newNote = {
            title,
            content,
            tags: Array.isArray(tags) ? tags : [],
            date: new Date().toLocaleDateString(),
        };

        onSave(newNote); // Send the new note back to Home
        onClose(); // Close the modal
    };

    return (
        <div className='relative'>
            {/* close-button */}
            <button
                onClick={onClose}
                className='absolute right-2'>
                <RxCross2 className='text-slate-500 hover:text-red-400 transition-all duration-300' />
            </button>
            <div className=''>
                {/* title-input */}
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-lg font-semibold text-slate-400'>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Go To GYM'
                        className='h-10 rounded-sm outline-none px-4 text-lg text-[#1d2d44] border-[1px] border-slate-500 border-opacity-20 hover:border-opacity-40 transition-all duration-200'
                    />
                </div>
                {/* content-input */}
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-lg text-slate-400 font-semibold'>Content</label>
                    <textarea
                        name=""
                        id=""
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='rounded-sm outline-none px-4 text-lg text-[#1d2d44] border-[1px] border-slate-500 border-opacity-20 hover:border-opacity-40 transition-all duration-200'
                        placeholder='Complete 50 dumbbell presses.'
                        rows={10}
                    ></textarea>
                </div>
                {/* tags-input */}
                <label htmlFor="" className='text-lg text-slate-400 font-semibold'>Tags</label>
                <TagInput tags={tags} setTags={setTags} />
                {/* add-button */}
                <button
                    onClick={handleSave}
                    className='w-[100%] py-2 bg-blue-600 rounded-sm text-white font-semibold hover:bg-blue-700 transition-all duration-200'>
                    ADD
                </button>
            </div>
        </div>
    );
};

export default AddEditNotes;
