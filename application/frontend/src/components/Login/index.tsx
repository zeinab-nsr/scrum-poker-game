import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketEvents } from '@spg/shared/src';
import { clientSocket } from '../../socket/clientSocket';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSubmit() {
    clientSocket.emitEvent(SocketEvents.JOIN_ROOM, username);
    clientSocket.listenToSocketEvent(SocketEvents.USERS_MODIFIED, handleNewUserLogin);
    navigate("/home");
  }

  function handleNewUserLogin(users) {
    sessionStorage.setItem("username", users);
  }

  return (
    <section className='login-container'>
      <h1>
        Online Scrum Poker Game!
      </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <input type="text" value={username} onChange={handleChange} />
        <input type="submit" className='invite-btn' value="Login to room!" />
      </form>
    </section>  
  );
}

export default Login;
