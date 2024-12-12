import React, { useEffect, useState } from 'react';
import TagInput from './TagInput';

import { RxCross2 } from "react-icons/rx";

// import { url } from '../utils/helper';

const AddEditNotes = ({ onClose, onSave, initialData, fetchNotes }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState("");
    const [file, setFile] = useState(null);

    const url = "https://neura-notes-backend.onrender.com";
    // const url = "http://localhost:3000";


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
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleDeleteFile = () => {
        console.log("deleteFile clicked")
        setFile(null);
        document.getElementById('fileInput').value = '';
    }
    // Save handler
    const handleSave = async () => {
        if(!title || !content){
            alert("Title and content cannot be empty");
            return;
        }
        const formData = new FormData();
        initialData && formData.append("noteId", initialData._id);
        formData.append("title", title),
        formData.append("content", content),
        formData.append("tags", (Array.isArray(tags) ? tags : []));
        formData.append("date", new Date().toLocaleDateString());
        if(file){
            formData.append("file", file);
        }

        const endpoint = initialData ? "/user/update-note" : "/user/add-new-note";
        const method = initialData ? "PUT" : "POST";

        try{
            const response = await fetch(`${url}${endpoint}`, {
                method,
                headers: {
                    token: localStorage.getItem("token"),
                },
                body: formData,
            });
            const data = await response.json();
            if(response.ok){
                fetchNotes();
                onClose();
            }
            else{
                alert(data.message || "Failed to save the note.");
            }
        }
        catch(error){
            console.log("Error while saving the note.", error.message);
            alert("An error occurred while saving the note.");
        }
    }


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
                    <label htmlFor="" className='text-lg text-slate-400 mt-2 font-semibold'>Content</label>
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
                {/* file-input */}
                <div className='flex flex-col'>
                    <label className='text-lg mt-3  text-slate-400 font-semibold'>File</label>
                    <div className='relative flex  items-center rounded-sm outline-none py-1 px-1 text-lg text-[#1d2d44] border-[1px] border-slate-500 border-opacity-20 hover:border-opacity-40 transition-all duration-200'>
                        <input
                            type="file"
                            id='fileInput'
                            onChange={handleFileChange}
                            className='w-[250px] '
                        />
                        <button 
                        onClick={handleDeleteFile}
                        className='absolute right-3'>
                            <RxCross2 className='text-slate-500 hover:text-red-400 transition-all duration-300' />
                        </button>
                    </div>
                </div>
                {/* tags-input */}
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-lg mt-3 text-slate-400 font-semibold'>Tags</label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>
                {/* add-button */}
                <button
                    onClick={handleSave}
                    className='w-[100%] py-2 bg-blue-600 rounded-sm text-white font-semibold hover:bg-blue-700 transition-all duration-200'>
                    {initialData ? "EDIT" : "ADD"}
                </button>
            </div>
        </div>
    );
};

export default AddEditNotes;

