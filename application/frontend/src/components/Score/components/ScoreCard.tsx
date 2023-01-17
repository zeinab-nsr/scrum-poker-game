import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { SocketEvents } from '@spg/shared/src';
import { clientSocket } from '../../../socket/clientSocket';
import { UsersStore } from '../../../store/User/users.reducers'

function ScoreCard() {
  const [selectedScore, setSelectedScore] = useState<string | number>('');
  const user = useSelector(({ users }) => users.user);
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
    if (user) {
      const { id } = user;
      clientSocket.emitEvent(SocketEvents.ADD_SCORE, {score, userId: id});
    }
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