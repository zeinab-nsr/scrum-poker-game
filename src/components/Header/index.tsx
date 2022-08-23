import React from "react";

function Header() {
  return (
    <header className='header'>
      <span>
        <b>Room1</b>
        Now voting: Add new header to home
      </span>
      <button className='invite-btn'>
        Invite Players
        <i></i>
      </button>
    </header>  
  );
}

export default Header;