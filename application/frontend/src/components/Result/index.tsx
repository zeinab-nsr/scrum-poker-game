import React, {useEffect, useState} from "react";
import {onGetAvg, offGEtAvg} from "../../socket";

function Result() {
  const [avg, setAvg] = useState<number>();

  useEffect(() => {
    onGetAvg(setAvg);

    return () => {
      offGEtAvg();
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