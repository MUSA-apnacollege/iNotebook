import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NotesState";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            {/* ✅ Protected Routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home showAlert={showAlert} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/about"
              element={
                isAuthenticated ? (
                  <About />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
