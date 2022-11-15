import React, {useEffect, useState} from "react";
import {onUsersModified, offUsersModified} from "../../socker";

interface User {
  username: string;
  id: string;
  rated: boolean;
}

function TeamActivityBar() {
  const [users, setUsers] = useState<[User]>();
  
  useEffect(() => {
    onUsersModified(setUsers);

    return () => {
      offUsersModified();
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
