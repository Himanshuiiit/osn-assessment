import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No notes available.</p>
      )}
    </div>
  );
};

export default NoteList;
