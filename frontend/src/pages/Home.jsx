import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => {
                setNotes(res.data); // Assuming res.data is an array
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
                setNotes([]); // Set notes to an empty array on error
            });
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note deleted!");
                    getNotes();
                } else {
                    alert("Failed to delete note.");
                }
            })
            .catch((error) => alert("Failed to delete note: " + error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!");
                    getNotes();
                } else {
                    alert("Failed to create note.");
                }
            })
            .catch((error) => alert("Failed to create note: " + error));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
