import React from "react";

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-sm text-gray-600">
        {note.content?.substring(0, 100)}
        {note.content?.length > 100 ? "..." : ""}
      </p>
      <p className="text-xs text-gray-400">
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
      {note.updatedAt !== note.createdAt && (
        <p className="text-xs text-gray-400">
          Updated at: {new Date(note.updatedAt).toLocaleString()}
        </p>
      )}
      <div className="mt-4">
        <button
          className="bg-yellow-500 text-white p-2 rounded mr-2"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
