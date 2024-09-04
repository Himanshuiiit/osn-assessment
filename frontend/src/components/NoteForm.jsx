import React, { useState, useEffect } from "react";
import noteService from "../services/noteService";

const NoteForm = ({ refreshNotes, editingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || title.length < 3) {
      alert("Title is required and must be at least 3 characters.");
      return;
    }

    try {
      if (editingNote) {
        await noteService.updateNote(editingNote._id, {
          title,
          content,
          updatedAt: new Date(),
        });
      } else {
        // Create note API call
        await noteService.createNote({ title, content });
      }
      refreshNotes();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;
