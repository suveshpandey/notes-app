import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import AddEditNotes from '../components/AddEditNotes';

import { MdAdd } from "react-icons/md";
import Modal from 'react-modal';
import { url } from '../utils/helper';

Modal.setAppElement('#root');

const Home = ({username, email, password, setUsername, setEmail, setPassword}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery]= useState("");
    const [openAddEditModel, setOpenEditModel] = useState({
        isShown: false,
        type: "add",
        data: null,
        index: null,
    });
    // const url = "http://localhost:3000/user";
    const handlePinNote = async (noteId) => {
        try{
            const token = localStorage.getItem("token");

            const response = await fetch(`${url}/pin-note`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({noteId})
            })
            const data = response.json();
            if(response.ok){
                const updatedNotes = notes.map((note) =>
                    note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
                );
                setNotes(updatedNotes);
                console.log(updatedNotes)
                console.log("note pinnded/unpinned successfully.");
                fetchNotes();
            }
            else{
                console.log(data.message);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from localStorage
            const response = await fetch(`${url}/get-notes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
            });
    
            const data = await response.json(); // Parse the JSON response
            if (response.ok) {
                // Sort the notes array: pinned notes first
                const sortedNotes = data.notes.sort((a, b) => b.isPinned - a.isPinned);
                setNotes(sortedNotes); // Update state with sorted notes
            } else {
                setError(data.message || "Failed to fetch notes."); // Handle errors from the API
            }
        } catch (error) {
            setError(error.message); // Catch any network or parsing errors
        } finally {
            setLoading(false); // Set loading to false after operation completes
        }
    };
    
    useEffect(()=>{
        fetchNotes();
    }, [])

    const handleAddNote = (newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const handleDeleteNote = async (noteId) => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}/delete-note`, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                    "token": token
                },
                body: JSON.stringify({noteId}),
            });
            if(response.ok){
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            }
            else{
                const data = await response.json();
                setError(data.message || "Failed to delte the note.");
            }
        }
        catch(error){
            setError(error.message);
        }
    };

    const handleEditNote = async (updatedNote) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}/update-note`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
                body: JSON.stringify({ 
                    noteId: updatedNote._id, // Explicitly include the noteId
                    title: updatedNote.title,
                    content: updatedNote.content,
                    tags: updatedNote.tags,
                }),
            });
            if (response.ok) {
                const updatedNoteFromBackend = await response.json();
                console.log("updated note: ", updatedNoteFromBackend)
                setNotes((prevNotes) => {
                    prevNotes.map((note) =>
                        note._id === updatedNoteFromBackend._id ? updatedNoteFromBackend : note
                    )
                });
            } 
            else {
                const data = await response.json();
                setError(data.message || "Failed to update the note.");
            }
        } 
        catch (error) {
            setError(error.message);
        }
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
        } 
        else if (openAddEditModel.type === "edit") {
            handleEditNote(note);
        }
        setOpenEditModel({ isShown: false, type: "add", data: null, index: null });
    };

    const handleSearch = () => {
        if (!searchQuery) {
            return notes;
        }
        const filteredNotes = notes.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        return filteredNotes.sort((a, b) => b.isPinned - a.isPinned);
    };
    

    if(loading) return <div className='h-[100vh] w-[100%] pt-16 flex justify-center items center '>Fetching data, please wait...</div>;
    if(error) return <div>Error: {error}</div>

    return (
        <div className="h-[100vh] flex">
            <Navbar 
            notes={notes} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
            username={username} 
            setUsername={setUsername} 
            notesLength={notes.length}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            />

            {/* <div className="w-[100%] sm:p-10 sm:px-10 sm:mt-10 mt-16 pb-16 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center justify-start sm:items-start items-center gap-x-16 overflow-y-auto">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            title={note.title}
                            date={note.date}
                            content={note.content}
                            tags={note.tags}
                            onDelete={() => handleDeleteNote(note._id)}
                            onEdit={() => onEdit(note)}
                            isPinnded={note.isPinned}
                            handlePinNote={() => handlePinNote(note._id)}
                        />
                    ))
                ) : (
                    <p>No notes added yet!</p>
                )}
            </div> */}
            <div className="w-[100%] sm:p-10 sm:px-10 sm:mt-10 mt-16 pb-16 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center justify-start sm:items-start items-center gap-x-16 overflow-y-auto">
                {handleSearch().length > 0 ? (
                    handleSearch().map((note) => (
                        <NoteCard
                            key={note._id}
                            title={note.title}
                            date={note.date}
                            content={note.content}
                            tags={note.tags}
                            file={note.file}
                            onDelete={() => handleDeleteNote(note._id)}
                            onEdit={() => onEdit(note)}
                            isPinnded={note.isPinned}
                            handlePinNote={() => handlePinNote(note._id)}
                        />
                    ))
                ) : (
                    <p>No notes found!</p>
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
                    fetchNotes={fetchNotes}
                />
            </Modal>
        </div>
    );
};

export default Home;