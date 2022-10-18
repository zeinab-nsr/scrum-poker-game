import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/index';
import Login from './components/Login/index';
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
