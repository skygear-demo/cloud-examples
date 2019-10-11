import React, { useState, useCallback } from 'react';
import './AuthForm.css';

function AuthForm() {
  const [username, setUsername] = useState("");
  const onUsernameChange = useCallback((e) => setUsername(e.target.value), []);

  const [password, setPassword] = useState("");
  const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(username, password);
    // TODO: signup/login
  }, [username, password]);

  return (
    <form className="AuthForm" onSubmit={onFormSubmit}>
      <div className="AuthForm-field">
        <label htmlFor="username" className="AuthForm-label">Name:</label>
        <input type="text" id="username" className="AuthForm-input" minLength={3} value={username} onChange={onUsernameChange} />
      </div>
      <div className="AuthForm-field">
        <label htmlFor="password" className="AuthForm-label">Password:</label>
        <input type="password" id="password" className="AuthForm-input" minLength={8} value={password} onChange={onPasswordChange} />
      </div>
      <input type="submit" value="Submit" className="AuthForm-submit" />
    </form>
  );
}

export default AuthForm;
