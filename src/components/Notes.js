import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = ({ showAlert }) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes().catch((error) => {
        console.error("❌ Error fetching notes:", error);
      });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    ref.current.click();
  };

  const handleClick = async () => {
    await editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    showAlert("✅ Note updated successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Hidden trigger button */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch edit modal
      </button>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
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
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
