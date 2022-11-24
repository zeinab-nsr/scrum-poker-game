import React, { useState } from "react";
import styled from 'styled-components'
import {emitAddScore} from "../../../socker";

function ScoreCard() {
  const [selectedScore, setSelectedScore] = useState<string | number>('');
  const scores = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];

  const StyledScore = styled.div`
    &:after {
      content: "${props => props.defaultValue}";
    }
    &:before {
      content: "${props => props.defaultValue}";
    }
  `;

  function handleSelectScore(score: string | number) {
    setSelectedScore(score);
    const username = sessionStorage.getItem("username");
    emitAddScore( {score, username});
  }

  return (
    <section className="score-wrapper">
      <div className="score-row">
        {scores.map(score =>
          <div key={score} className={selectedScore !== score ? "score-card" : "score-card selected"} onClick={() => handleSelectScore(score)}>
            <StyledScore className="score" defaultValue={score}>
              {score}
            </StyledScore>
          </div>
        )}
      </div>
    </section>
  );
}

export default ScoreCard;