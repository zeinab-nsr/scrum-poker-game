import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {joinRoom} from "../../socket";

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSubmit() {
    joinRoom(username);
    navigate("/home");
  }

  return (
    <section className='login-container'>
      <h1>
        Online Scrum Poker Game!
      </h1>
      <form className="login-form-wrapper" onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <input type="text" value={username} onChange={handleChange} />
        <input type="submit" className='invite-btn' value="Login to room!" />
      </form>
    </section>  
  );
}

export default Login;
