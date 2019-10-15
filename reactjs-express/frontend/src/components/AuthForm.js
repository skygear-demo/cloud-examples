import React, { useState, useCallback } from 'react';
import skygear, { SkygearError, SkygearErrorNames } from '@skygear/web';
import './AuthForm.css';

function AuthForm(props) {
  const { onAuthStateChange } = props;

  const [username, setUsername] = useState("");
  const onUsernameChange = useCallback((e) => setUsername(e.target.value), []);

  const [password, setPassword] = useState("");
  const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);

  const [error, setError] = useState("");

  const onFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await skygear.auth.login(username, password);
      onAuthStateChange();
      return;
    } catch (err) {
      // Display errors other than user not found.
      if (!(err instanceof SkygearError && err.name === SkygearErrorNames.ResourceNotFound)) {
        setError(String(err));
        return;
      }
    }

    try {
      await skygear.auth.signupWithUsername(username, password);
      onAuthStateChange();
    } catch (err) {
      setError(String(err));
      return;
    }
  }, [username, password, onAuthStateChange]);

  return (
    <form className="AuthForm" onSubmit={onFormSubmit}>
      <div className="AuthForm-field">
        <label htmlFor="username" className="AuthForm-label">Name:</label>
        <input type="text" id="username" className="AuthForm-input" required minLength={3} maxLength={10} value={username} onChange={onUsernameChange} />
      </div>
      <div className="AuthForm-field">
        <label htmlFor="password" className="AuthForm-label">Password:</label>
        <input type="password" id="password" className="AuthForm-input" required minLength={8} value={password} onChange={onPasswordChange} />
      </div>
      <p className="AuthForm-error">{error}</p>
      <input type="submit" value="Submit" className="AuthForm-submit" />
    </form>
  );
}

export default AuthForm;
