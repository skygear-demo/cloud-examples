import React, { useCallback } from 'react';
import skygear from '@skygear/web';
import './AuthBadge.css';

function AuthBadge(props) {
  const { onAuthStateChange, username } = props;

  const onLogout = useCallback(async (e) => {
    e.preventDefault();

    try {
      await skygear.auth.logout();
      onAuthStateChange();
    } catch (err) {
      // Ignore logout errors.
      console.log(err);
    }
  }, [onAuthStateChange]);

  return (
    <form className="AuthBadge" onSubmit={onLogout}>
      <p className="AuthBadge-error">Welcome, {username}</p>
      <input type="submit" value="Logout" className="AuthBadge-logout" />
    </form>
  );
}

export default AuthBadge;
