import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SocketEvents } from '@spg/shared/src';
import UserActions from '../../store/User/users.actions';
import { clientSocket } from '../../socket/clientSocket';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSubmit() {
    clientSocket.emitEvent(SocketEvents.JOIN_ROOM, username);
    clientSocket.listenToSocketEvent(SocketEvents.USER_JOINED, handleNewUserLogin);
    navigate("/home");
  }

  function handleNewUserLogin(newUser) {
    dispatch(UserActions.setUserInfo(newUser));
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
