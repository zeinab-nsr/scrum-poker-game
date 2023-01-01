import React, {useEffect, useState} from "react";
import {onUsersModified, offUsersModified} from "../../socket";

interface User {
  username: string;
  id: string;
  voted: boolean;
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
          <div key={user.id} className={!user.voted ? "player" : "player voted"}>{user.username}</div>
        ))
      }
    </section>
  );
}

export default TeamActivityBar;
