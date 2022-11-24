import React from "react";
import Header from '../Header/index';
import Result from '../Result/index';
import TeamActivityBar from '../TeamActivityBar/index';
import Score from "../Score/index";

function Home() {

  return (
    <section className='container'>
      <Header />
      <Result />
      <TeamActivityBar />
      <Score />
    </section>  
  );
}

export default Home;
