import Header from'./components/Header/index';
import Result from'./components/Result/index';
import TeamActivityBar from'./components/TeamActivityBar/index';
import './App.scss';

function App() {
  return (
    <div className='container'>
      <Header />
      <Result />
      <TeamActivityBar />
    </div>  
  );
}

export default App;
