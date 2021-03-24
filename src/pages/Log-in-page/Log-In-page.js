/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userContext } from '../../contexts/user-context';
import { loginResponse } from '../../redux/actions';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import LogInBanner from './Log-In-page-banner.png';
import styles from './Log-In-page.module.scss';

function LogInPage({ loginResponse, loading, loaded, login }) {
  const { setSessionUser } = useContext(userContext);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (!loading && loaded) {
      localStorage.setItem('sessionUser', JSON.stringify(login));
      setSessionUser(login); // setSessionUser redirect us to the Store-page
    }
  }, [username, setSessionUser, loading, loaded, login]);

  const inputFocus = useRef(null); // set autofocus on input

  useEffect(() => {
    inputFocus.current.focus();
  }, [inputFocus]);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    loginResponse(username);
  };

  const handleInputValidity = (ev) => {
    ev.preventDefault();
    ev.target.setCustomValidity(''); // use the empty string to indicatethat the element does not have a custom validity error.

    if (!ev.target.checkValidity()) {
      ev.target.setCustomValidity('Username is not valid'); // set custom validity error
    }

    setUsername(ev.target.value);
  };

  if (loading && !loaded) return <Loader />;

  return (
    <div className={styles['log-in-page']}>
      <div className={styles['log-in-page__container']}>
        <div className={styles['log-in-page__default-banner']}>
          <img src={LogInBanner} alt="Log-In banner with abstract user" />
        </div>
        <div className={styles['log-in-page__title']}>JS Band Store</div>
        <form onSubmit={handleSubmit}>
          <input
            id="id"
            type="text"
            pattern="[^\s]+" // forbid spaces
            placeholder="Type your name..."
            onChange={handleInputValidity}
            ref={inputFocus}
            required
            minLength="4"
            maxLength="16"
          />
          <Button type="submit" description="Log In" />
        </form>
      </div>
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
