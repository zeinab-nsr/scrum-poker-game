import React, {useEffect, useState} from "react";
import { io } from "socket.io-client";

const socket = io();

interface User {
  username: string;
  id: string;
  rated: boolean;
}

function TeamActivityBar() {
  const [users, setUsers] = useState<[User]>();
  
  useEffect(() => {
    socket.on("updated users", (newUsersList: [User]) => {
      setUsers(newUsersList);
    });

    return () => {
      socket.off('updated users');
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
