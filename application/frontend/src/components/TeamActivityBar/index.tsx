import React, {useEffect, useState} from 'react';
import { SocketEvents } from '@spg/shared/src';
import { clientSocket } from '../../socket/clientSocket';

interface User {
  username: string;
  id: string;
  voted: boolean;
}

function TeamActivityBar() {
  const [users, setUsers] = useState<[User]>();
  
  useEffect(() => {
    clientSocket.listenToSocketEvent(SocketEvents.USERS_MODIFIED, handleUpdateUser);
    //return () => {
      //clientSocket.listenToSocketEvent(SocketEvents.USERS_MODIFIED, () => socket.off(SocketEvents.USERS_MODIFIED));
    //};
  }, []);

  function handleUpdateUser(users: [User]) {
    setUsers(users);
  }

  return (
    <section className="players-row">
      {
        users?.length && users.map(user => (
          <div key={user.id} className={!user.voted ? "player" : "player voted"}>{user.username}</div>
        ))
      }
    </section>
  );
}

export default TeamActivityBar;
