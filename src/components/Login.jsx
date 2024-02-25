import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/");
        localStorage.setItem("users", auth.currentUser.email);
        console.log(auth.currentUser.email);
        toast.success("Log In Succesfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          name="username"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>

        <p>
          Don't Have a account <Link to="/register">Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
