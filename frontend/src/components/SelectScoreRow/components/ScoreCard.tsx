import React from "react";
import styled from 'styled-components'

function ScoreCard() {

    const StyledScore = styled.div`
    &:after {
      content: "${props => props.defaultValue}";
    }
    &:before {
      content: "${props => props.defaultValue}";
    }
  `;

    return (
      <section className="score-wrapper">
        <div className="score-row">
          <div className="score-card">
            <StyledScore className="score" defaultValue="1">
                1
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="2">
                2
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="3">
                3
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="5">
                5
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="8">
                8
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="13">
                13
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="20">
                20
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="40">
                40
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="100">
                100
            </StyledScore>
          </div>
          <div className="score-card">
            <StyledScore className="score" defaultValue="?">
              ?
            </StyledScore>
          </div>
        </div>
      </section>
    );
  }
  
  export default ScoreCard;