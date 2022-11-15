import React from "react";
import styled from 'styled-components'
import {emitAddScore} from "../../../socker";

function ScoreCard() {

  const scores = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?']

  const StyledScore = styled.div`
    &:after {
      content: "${props => props.defaultValue}";
    }
    &:before {
      content: "${props => props.defaultValue}";
    }
  `;

  function addScore(score: string | number) {
    const userId = sessionStorage.getItem("id");
    emitAddScore( {score, userId});

  }

  return (
    <section className="score-wrapper">
      <div className="score-row">
        {scores.map(score =>
          <div key={score} className="score-card" onClick={() => addScore(score)}>
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