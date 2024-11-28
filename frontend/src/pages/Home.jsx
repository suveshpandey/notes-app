import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import AddEditNotes from '../components/AddEditNotes';

import { MdAdd } from "react-icons/md";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [openAddEditModel, setOpenEditModel] = useState({
        isShown: false,
        type: "add",
        data: null,
        index: null,
    });

    const handleAddNote = (newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const handleDeleteNote = (indexToDelete) => {
        setNotes((prevNotes) => prevNotes.filter((_, index) => index !== indexToDelete));
    };

    const handleEditNote = (updatedNote, index) => {
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes];
            updatedNotes[index] = updatedNote;
            return updatedNotes;
        });
    };

    const onEdit = (note, index) => {
        setOpenEditModel({
            isShown: true,
            type: "edit",
            data: note,
            index,
        });
    };

    const handleSave = (note) => {
        if (openAddEditModel.type === "add") {
            handleAddNote(note);
        } else if (openAddEditModel.type === "edit") {
            handleEditNote(note, openAddEditModel.index);
        }
        setOpenEditModel({ isShown: false, type: "add", data: null, index: null });
    };

    return (
        <div className="h-[100vh] flex">
            <Navbar />

            <div className="w-[100%] sm:p-10 sm:px-10 sm:mt-10 mt-14 flex flex-wrap justify-center gap-x-16 overflow-y-auto">
                {notes.length > 0 ? (
                    notes.map((note, index) => (
                        <NoteCard
                            key={index}
                            title={note.title}
                            date={note.date}
                            content={note.content}
                            tags={note.tags}
                            onDelete={() => handleDeleteNote(index)}
                            onEdit={() => onEdit(note, index)}
                        />
                    ))
                ) : (
                    <p>No notes added yet!</p>
                )}
            </div>

            <button
                onClick={() => setOpenEditModel({ isShown: true, type: "add", data: null })}
                className="bg-blue-600 hover:bg-blue-700 text-white size-14 text-5xl hover:shadow-blue-300 hover:shadow-md rounded-lg flex items-center justify-center fixed sm:bottom-10 bottom-5 sm:right-10 right-5 transition-all duration-300"
            >
                <MdAdd />
            </button>

            <Modal
                isOpen={openAddEditModel.isShown}
                onRequestClose={() => setOpenEditModel({ isShown: false })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                className="lg:w-[40%] w-[90%] max-h-3/4 mx-auto mt-16 bg-white rounded-md p-3 shadow-md hover:shadow-lg transition-all duration-200"
            >
                <AddEditNotes
                    onClose={() => setOpenEditModel({ isShown: false })}
                    onSave={handleSave}
                    initialData={openAddEditModel.data}
                />
            </Modal>
        </div>
    );
};

export default Home;
