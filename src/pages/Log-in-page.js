/* eslint-disable import/named */
/* eslint-disable no-shadow */
import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userContext } from '../contexts/user-context';
import { loginResponse } from '../redux/actions';

function LogInPage({ loginResponse, loading, loaded, login }) {
  const { setSessionUser } = useContext(userContext);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (!loading && loaded) {
      localStorage.setItem('sessionUser', JSON.stringify(login));

      // setSessionUser handles redirecting to Store-page
      setSessionUser(username);
    }
  }, [username, setSessionUser, loading, loaded, login]);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (username && username.length >= 4 && username.length <= 16) {
      loginResponse(username);

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

LogInPage.propTypes = {
  loginResponse: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    login: state.login.entities,
    loading: state.login.loading,
    loaded: state.login.loaded,
  }),
  { loginResponse }
)(LogInPage);
