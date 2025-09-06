import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext"; // ✅ small 'n' because file name is noteContext.js

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const success = await addNote(
      note.title,
      note.description,
      note.tag || "General"
    );

    if (success) {
      showAlert("✅ Note added successfully!", "success");
      setNote({ title: "", description: "", tag: "" });
    } else {
      showAlert("⚠️ Failed to add note (check title/description)", "danger");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            placeholder="Enter at least 3 characters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            rows="2"
            placeholder="Enter at least 5 characters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            placeholder="e.g. Work, Personal"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 3 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
