import React, {useEffect, useState} from "react";
import { io } from "socket.io-client";

const socket = io();

interface User {
  username: string;
  id: string;
}

function TeamActivityBar() {
  const [users, setUsers] = useState<[User]>();
  
  useEffect(() => {
    socket.on("new user", (newUsersList: [User]) => {
      setUsers(newUsersList);
    });
    return () => {
      socket.off('new user');
    };
  }, []);

  return (
    <section className="players-row">
      {
        users && users.map(user => (
          <div key={user.id} className="player">{user.username}</div>
        ))
      }
    </section>
  );
}

export default TeamActivityBar;
