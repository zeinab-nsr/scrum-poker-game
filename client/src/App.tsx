import React from "react";
import Header from'./components/Header/index';
import Result from'./components/Result/index';
import TeamActivityBar from'./components/TeamActivityBar/index';
import SelectScoreRow from'./components/SelectScoreRow/index';
import './App.scss';

function App() {

  React.useEffect(()=>{
    callBackendAPI()
        .then(res => {})
        .catch(err => console.log(err));
  })
  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

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
