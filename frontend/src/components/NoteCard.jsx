import React from 'react';
import { MdDelete } from "react-icons/md";
import { PiPushPinSimpleFill } from "react-icons/pi";
import { PiPushPinSimpleSlashFill } from "react-icons/pi";

import { RiEdit2Fill } from "react-icons/ri";

const NoteCard = ({ title, date, content, tags, onEdit, onDelete, isPinnded, handlePinNote }) => {
    return (
        <div className="sm:w-[400px] w-[90%] h-[200px] flex flex-col bg-green-100 bg-opacity-20 p-3 rounded-md border-[1px] border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 mb-5">
            {/* Header Section */}
            <div className="flex justify-between">
                <div>
                    <div className="text-xl font-semibold text-[#1d2d44]">{title}</div>
                    <div className="text-xs font-semibold opacity-50">{date}</div>
                </div>
                <div className="flex items-center justify-center">
                    {
                        !isPinnded ? <PiPushPinSimpleFill className="text-blue-600 size-5 cursor-pointer" onClick={handlePinNote} />
                        : <PiPushPinSimpleSlashFill className="text-blue-600 size-5 cursor-pointer" onClick={handlePinNote} />
                    }
                </div>
            </div>
            
            {/* Content Section */}
            <div className="pt-2 flex flex-col text-[#1b263b] font-medium flex-grow overflow-hidden">
                <p className="overflow-y-auto break-words text-sm h-[100px] " style={{scrollbarWidth:'none'}}>
                    {content}
                </p>

                {/* Footer Section */}
                <div className="flex justify-between mt-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                        {tags &&
                            tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-blue-600 py-1 rounded-md text-sm font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                    </div>
                    
                    {/* Edit/Delete Buttons */}
                    <div className="flex">
                        <RiEdit2Fill
                            onClick={onEdit}
                            className="text-[#8d99ae] size-5 mr-[8px] cursor-pointer"
                        />
                        <MdDelete
                            onClick={onDelete}
                            className="text-[#ff758f] size-5 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
