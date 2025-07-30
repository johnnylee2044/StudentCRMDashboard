import React, { useState } from 'react';
import LoginPage from './pages/Login';
const App = () => {

  console.log("it is printed in app.js")

  return (
    <div className="login-container">
      <LoginPage />
    </div>
  );
};

export default App;