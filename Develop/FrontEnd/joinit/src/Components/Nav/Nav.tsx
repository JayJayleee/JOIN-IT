import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <div className="Navbar">
        <img
          src="/Assets/Images/logo2.png"
          alt="logo img"
          className="logoimg"
        />
        <img
          src="/Assets/Images/usericon.png"
          alt="usericon"
          className="usericon"
        />
      </div>
    </div>
  );
}

export default Nav;
