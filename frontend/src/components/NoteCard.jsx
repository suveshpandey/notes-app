import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { PiPushPinSimpleFill } from "react-icons/pi";
import { PiPushPinSimpleSlashFill } from "react-icons/pi";
import { RiEdit2Fill } from "react-icons/ri";

import Modal from 'react-modal';

const NoteCard = ({ title, date, content, tags, file, onEdit, onDelete, isPinnded, handlePinNote }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
     // Handle image click to open the modal
    const handleImageClick = (imgSrc) => {
        setModalImage(imgSrc);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage('');
    };

    const handleDownload = (fileData, fileName) => {
        // Check if the data starts with "data:" (data URI scheme) and remove the prefix
        let base64Data = fileData;
        if (fileData.startsWith('data:')) {
            const splitIndex = fileData.indexOf(';base64,') + ';base64,'.length;
            base64Data = fileData.substring(splitIndex);
        }
    
        // Validate base64 string format
        if (!base64Data || !/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
            console.error("Invalid base64 string:", base64Data);
            alert("Invalid base64 data received. Cannot download the file.");
            return;
        }
    
        try {
            // Decode the base64 string into a byte string
            const byteCharacters = atob(base64Data);
            const byteArrays = [];
    
            // Convert each byte into an array of bytes
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
    
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
    
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
    
            // Determine the MIME type based on the file extension
            const mimeType = getMimeType(fileName);
            const blob = new Blob(byteArrays, { type: mimeType });
    
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName; // Set the filename to download
            link.click(); // Programmatically click the link to trigger the download
        } catch (error) {
            console.error('Error decoding base64 string:', error);
            alert('Failed to download the file.');
        }
    };
    
    // Function to determine the MIME type based on the file extension
    const getMimeType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'png': return 'image/png';
            case 'jpg': case 'jpeg': return 'image/jpeg';
            case 'pdf': return 'application/pdf';
            // Add other types as needed
            default: return 'application/octet-stream';
        }
    };
    
    
    

    return (
        <div className={`sm:w-[400px] w-[90%] ${file ? `h-auto` : 'h-[200px]'} flex flex-col bg-green-100 bg-opacity-20 p-3 rounded-md border-[1px] border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 mb-5`}>
            {/* Header Section */}
            <div className="flex justify-between">
                <div>
                    <div className="text-xl font-semibold text-[#1d2d44]">{title}</div>
                    <div className="text-xs font-semibold opacity-50">{date}</div>
                </div>
                <div className="flex items-center justify-center">
                    {
                        !isPinnded ? <PiPushPinSimpleFill className="text-blue-600 size-6 cursor-pointer" onClick={handlePinNote} />
                        : <PiPushPinSimpleSlashFill className="text-blue-600 size-6 cursor-pointer" onClick={handlePinNote} />
                    }
                </div>
            </div>
            
            {/* Content Section */}
            <div className="pt-2 flex flex-col text-[#1b263b] font-medium flex-grow overflow-hidden">
                <p className="overflow-y-auto break-words text-sm h-[100px]" style={{ scrollbarWidth: 'none' }}>
                    {content}
                </p>
                 {/* File Section */}
                {file && (
                    <div>
                        <div className="pt-2">
                            <img 
                                src={`data:application/pdf;base64,${file}`} 
                                alt="Note File" 
                                className="w-full h-auto rounded-md hover:shadow-slate-600 shadow-sm transition-all duration-300 cursor-pointer"
                                onClick={() => handleImageClick(`data:application/pdf;base64,${file}`)}
                            />
                        </div>

                        {/* Modal to show the full-size image */}
                        
                        <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal} // Close when clicked outside
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                            }
                        }}
                        className="lg:w-[70%] w-[90%] max-h-3/4 mx-auto sm:mt-16 mt-36 bg-white sm:bg-opacity-60 bg-opacity-0 rounded-md py-3 sm:px-3 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="text-red-500 font-bold">Close</button>
                        </div>
                        <img 
                            src={modalImage} 
                            alt="Full Screen View" 
                            className="w-full h-auto rounded-md"
                        />
                    </Modal>
                    </div>
                )}



                {/* Footer Section */}
                <div className="flex justify-between mt-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                        {tags &&
                            tags.map((tag, index) => (
                                <span key={index} className="text-blue-600 py-1 rounded-md text-sm font-medium">
                                    #{tag}
                                </span>
                            ))}
                    </div>
                    
                    {/* Edit/Delete Buttons */}
                    <div className="flex">
                        <RiEdit2Fill
                            onClick={onEdit}
                            className="text-[#8d99ae] size-6 mr-[8px] cursor-pointer"
                        />
                        <MdDelete
                            onClick={onDelete}
                            className="text-[#ff758f] size-6 cursor-pointer"
                        />
                    </div>
                </div>

                {/* File Section */}
                {file && (
                    <div className="mt-2">
                        <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleDownload(file, `${title}.txt`)}
                        >
                            Download File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
