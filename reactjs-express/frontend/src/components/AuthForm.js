import React from 'react';
import './AuthForm.css';

function AuthForm() {
  return (
    <form className="AuthForm">
      <div className="AuthForm-field">
        <label htmlFor="username" className="AuthForm-label">Name:</label>
      </div>
      <div className="AuthForm-field">
        <label htmlFor="password" className="AuthForm-label">Password:</label>
        <input type="password" id="password" className="AuthForm-input" />
      </div>
      <input type="submit" value="Submit" className="AuthForm-submit" />
    </form>
  );
}

export default AuthForm;
