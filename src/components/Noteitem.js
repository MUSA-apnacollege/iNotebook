import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = ({ note, updateNote, showAlert }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3 shadow-sm border-0 rounded-3">
        <div className="card-body">
          {/* Title + Icons */}
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{note.title}</h5>
            <div>
              {/* Delete Icon (Red) */}
              <i
                className="fa-solid fa-trash mx-2 text-danger"
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("🗑️ Note deleted successfully!", "danger");
                }}
              ></i>

              {/* Edit Icon (Blue) */}
              <i
                className="fa-solid fa-pen-to-square mx-2 text-primary"
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>

          {/* Description */}
          <p className="card-text mt-2">{note.description}</p>

          {/* Tag badge */}
          {note.tag && (
            <span className="badge rounded-pill bg-secondary">
              {note.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
