import React, { useState, useEffect } from 'react';
import skygear from '@skygear/web';
import AuthForm from './components/AuthForm';
import './App.css';

async function configureSkygear() {
  try {
    await skygear.configure({ endpoint: process.env.REACT_APP_API_ENDPOINT, apiKey: process.env.REACT_APP_API_KEY });
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
}

function App() {
  const [configured, setConfigured] = useState(false);
  useEffect(() => {
    setConfigured(configureSkygear());
  }, []);

  return (
    <div className="App">
      {configured ?
        <AuthForm /> :
        null
      }
    </div>
  );
}

export default App;
