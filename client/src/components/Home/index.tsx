import React from "react";
import Header from '../Header/index';
import Result from '../Result/index';
import TeamActivityBar from '../TeamActivityBar/index';
import SelectScoreRow from '../SelectScoreRow/index';

function Home() {

  return (
    <section className='container'>
      <Header />
      <Result />
      <TeamActivityBar />
      <SelectScoreRow />
    </section>  
  );
}

export default Home;
