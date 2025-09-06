import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ password aur confirm password check
    if (credentials.password !== credentials.cpassword) {
      showAlert("⚠️ Passwords do not match!", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // ✅ Save token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        showAlert("✅ Account created successfully!", "success");
      } else {
        showAlert("⚠️ Invalid details, please try again", "danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showAlert("❌ Something went wrong, try again later", "danger");
    }
  };

  return (
    <div className="container my-3">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
