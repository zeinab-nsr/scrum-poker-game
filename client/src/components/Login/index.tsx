import React from "react";

function Login() {
  return (
    <section className='login-container'>
      <section className="login-form-wrapper">
        <label>Enter your name:</label>
        <input type="text" />
        <button className='invite-btn'>
          Login to room!
        </button>
      </section>
    </section>  
  );
}

export default Login;