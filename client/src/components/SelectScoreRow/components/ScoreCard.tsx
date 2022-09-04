import React from "react";

function ScoreCard() {
    return (
      <section className="score-wrapper">
        <div className="score-row">
          <div className="score-card">
              <div className="score">
                  1
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  2
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  3
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  5
              </div>
            </div>
        </div>

        <div className="score-row">
          <div className="score-card">
              <div className="score">
                  8
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  13
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  20
              </div>
            </div>
            <div className="score-card">
              <div className="score">
                  40
              </div>
            </div>
        </div>
      </section>
      
    );
  }
  
  export default ScoreCard;