import React, {useEffect, useState} from 'react';
import { SocketEvents } from '@spg/shared/src';
import { clientSocket } from '../../socket/clientSocket';
import { User } from '../../store/User/users.types';

function TeamActivityBar() {
  const [users, setUsers] = useState<[User]>();
  
  useEffect(() => {
    clientSocket.listenToSocketEvent(SocketEvents.USERS_MODIFIED, handleUpdateUser);
  }, []);

  function handleUpdateUser(users: [User]) {
    console.log('fsf',users)
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
