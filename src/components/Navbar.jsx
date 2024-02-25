import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../Config/firebase-config';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sideBar, setSideBar] = useState("All Events");
  const handleSignOut = async () => {
    
      try {
        await signOut(auth).then(() => {
          toast.success("Log Out Succesfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.removeItem("users");
          window.location.reload();
        });
      } catch (err) {
        console.log(err);
      }

  };
  return (
    <nav className="navbar">
      {/* <div>AEMS</div> */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "24px",
          color: "blue",
        }}
      >
        EventMaster.Pro
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
}

export default Navbar