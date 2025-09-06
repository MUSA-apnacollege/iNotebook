import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  // ✅ Get token from localStorage
  const getAuthToken = () => localStorage.getItem("token");

  const [notes, setNotes] = useState([]);

  // ✅ Fetch Notes
  const getNotes = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("❌ No auth token found");
        return;
      }

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();

      if (!response.ok) {
        console.error("❌ Failed to fetch notes:", json.error || response.statusText);
        return;
      }

      setNotes(json);
    } catch (error) {
      console.error("❌ Error in getNotes:", error);
    }
  };

  // ✅ Add Note
  const addNote = async (title, description, tag) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("❌ No auth token found");
        return false;
      }

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return false;
      }

      const json = await response.json();

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.concat(json));
        return true;
      } else {
        console.error("❌ Validation error:", json.errors || json.error);
        return false;
      }
    } catch (error) {
      console.error("❌ Error in addNote:", error);
      return false;
    }
  };

  // ✅ Delete Note
  const deleteNote = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        console.error("❌ Delete error:", json.error);
      }
    } catch (error) {
      console.error("❌ Error in deleteNote:", error);
    }
  };

  // ✅ Edit Note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
          )
        );
      } else {
        console.error("❌ Update error:", json.error);
      }
    } catch (error) {
      console.error("❌ Error in editNote:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
