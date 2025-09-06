import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="teacher-navbar bg-dark">
        <ul className="teacher-navbar-links">
          {/* ✅ Show Home & About only if logged in */}
          {localStorage.getItem("token") && (
            <>
              <li>
                <Link
                  className={`teacher-nav-link ${location.pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`teacher-nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </>
          )}
        </ul>

        <form className="teacher-navbar-search" role="search">
          {!localStorage.getItem("token") ? (
            <>
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-danger mx-2" onClick={handleLogout}>
              Logout
            </button>
          )}
        </form>
      </nav>
    </>
  );
};

export default Navbar;
