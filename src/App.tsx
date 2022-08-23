import React from "react";
import Header from'./components/Header/index';
import Result from'./components/Result/index';
import TeamActivityBar from'./components/TeamActivityBar/index';
import SelectScoreRow from'./components/SelectScoreRow/index';
import './App.scss';

function App() {
  return (
    <section className='container'>
      <Header />
      <Result />
      <TeamActivityBar />
      <SelectScoreRow />
    </section>  
  );
}

export default App;
