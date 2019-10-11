import React, { useState, useEffect, useCallback } from 'react';
import skygear, { SkygearError, SkygearErrorNames } from '@skygear/web';
import AuthForm from './components/AuthForm';
import './App.css';

async function configureSkygear() {
  try {
    await skygear.configure({ endpoint: process.env.REACT_APP_API_ENDPOINT, apiKey: process.env.REACT_APP_API_KEY });
  } catch (err) {
    alert(err);
    return false;
  }

  // Check the current authentication status.
  try {
    await skygear.auth.me();
  } catch (err) {
    // Ignore not authenticated error.
    if (!(err instanceof SkygearError && err.name === SkygearErrorNames.NotAuthenticated)) {
      alert(err);
      return false;
    }
  }
  return true;
}

function App() {
  const [configured, setConfigured] = useState(false);
  useEffect(() => {
    configureSkygear().then(setConfigured);
  }, []);

  const [username, setUsername] = useState(undefined);
  const onAuthStateChange = useCallback(
    () => setUsername(skygear.auth.currentIdentity && skygear.auth.currentIdentity.loginID),
    []);
  useEffect(() => {
    if (configured) {
      onAuthStateChange();
    }
  }, [configured, onAuthStateChange]);

  return (
    <div className="App">
      {configured ?
        username ?
          <p>Welcome, {username}</p> :
          <AuthForm onAuthStateChange={onAuthStateChange} /> :
        null
      }
    </div>
  );
}

export default App;
