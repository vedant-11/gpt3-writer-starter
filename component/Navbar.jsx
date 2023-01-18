import React from "react";

const Navbar = () => {
  function myFunction() {
    var x = document.getElementById("navbar-right");
    if (x.className === "navbar-right") {
      x.className += " responsive";
    } else {
      x.className = "navbar-right";
    }
  }
  return (
    <nav>
      <div class="navbar">
        <a href="#" class="logo">
          Divine01
        </a>
        <div class="navbar-right">
          <a href="#">Home</a>
          <a href="#">Support</a>
          <a href="#">Contact</a>
          <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
