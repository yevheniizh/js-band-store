/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { userContext } from '../contexts/user-context';

function LogInPage() {
  const { setSessionUser } = useContext(userContext);
  const [username, setUsername] = useState(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (username && username.length >= 4 && username.length <= 16) {
      setSessionUser(username);
      localStorage.setItem('sessionUser', JSON.stringify({ username }));
      return console.log(`You are log in as ${username}`);
    }

    return console.log('Username is not valid');
  };

  return (
    <div>
      <div>Log In Page</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type here"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LogInPage;
