import React, {useState} from "react";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const socket = io();

function Login() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handleSubmit() {
    socket.emit("join room", userName);
    socket.on("get id", (userId) => {
      sessionStorage.setItem("id", userId);
    })
    navigate("/home");
  }

  return (
    <section className='login-container'>
      <h1>
        Online Scrum Poker Game!
      </h1>
      <form className="login-form-wrapper" onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <input type="text" value={userName} onChange={handleChange} />
        <input type="submit" className='invite-btn' value="Login to room!" />
      </form>
    </section>  
  );
}

export default Login;
