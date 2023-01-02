import React, {useEffect, useState} from "react";
import { SocketEvents } from '@spg/shared/src';
import { clientSocket } from "../../socket/clientSocket";

function Result() {
  const [avg, setAvg] = useState<number>();

  useEffect(() => {
    clientSocket.listenToSocketEvent(SocketEvents.USERS_MODIFIED, calculateAverageScore);
    // return () => {
    //   offGEtAvg();
    // };
  }, []);

  function calculateAverageScore(average: number) {
    setAvg(average);
  }

  return (
    <section className="result-desk">
      <h1>{avg}</h1>
      Waiting for player's votes
      <span className="blinking-dot">.</span>
      <span className="blinking-dot">.</span>
      <span className="blinking-dot">.</span>
    </section>
  );
}

export default Result;
