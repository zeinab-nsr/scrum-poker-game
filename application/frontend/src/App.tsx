import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/index.reducer";
import Home from './components/Home/index';
import Login from './components/Login/index';
import './App.scss';

const store = configureStore({
  reducer: rootReducer,
});

function App() {

  React.useEffect(()=>{
    // callBackendAPI()
    //     .then(res => {})
    //     .catch(err => console.log(err));
  })

  // const callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // };

  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
    </Routes>
    </Provider>
  );
}

export default App;
