import React, {useEffect, useState} from "react";
import {io} from "socket.io-client"

const socket = io()

function Result() {
  const [avg, setAvg] = useState<number>();

  useEffect(() => {
    socket.on("average", (avg) => {
      setAvg(avg);
    });

    return () => {
      socket.off('average');
    };
  }, []);

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