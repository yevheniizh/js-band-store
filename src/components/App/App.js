/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import { UserProvider } from '../../contexts/user-context';
import { setExistedSessionUser } from '../../redux/actions';

import LogInPage from '../../pages/Log-in-page';
import NotFoundPage from '../../pages/Not-found-page';

function App({ setExistedSessionUser, loaded }) {
  const existedSessionUser = JSON.parse(localStorage.getItem('sessionUser')); // null if user is not existed yet
  const [sessionUser, setSessionUser] = useState(existedSessionUser);
  useEffect(() => {
    if (!loaded && sessionUser) {
      setExistedSessionUser(existedSessionUser);
    }
  }, [loaded, sessionUser, setExistedSessionUser, existedSessionUser]);

  if (sessionUser) {
    return (
      <UserProvider value={{ sessionUser, setSessionUser }}>
        <Switch>
          <Route
            exact
            path="/js-band-store"
            component={() => <h1>Calendar</h1>}
          />
          <Route
            exact
            path="/js-band-store/not-found"
            component={NotFoundPage}
          />
          <Redirect exact from="/js-band-store/login" to="/js-band-store" />
          <Redirect exact from="/" to="/js-band-store" />
          <Redirect to="/js-band-store/not-found" />
        </Switch>
      </UserProvider>
    );
  }

  return (
    <UserProvider value={{ setSessionUser }}>
      <Switch>
        <Route exact path="/js-band-store/login" component={LogInPage} />
        <Route exact path="/js-band-store/not-found" component={NotFoundPage} />
        <Redirect exact from="/js-band-store" to="/js-band-store/login" />
        <Redirect exact from="/" to="/js-band-store/login" />
        <Redirect to="/js-band-store/not-found" />
      </Switch>
    </UserProvider>
  );
}

App.propTypes = {
  setExistedSessionUser: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    loaded: state.login.loaded,
  }),
  { setExistedSessionUser }
)(App);
