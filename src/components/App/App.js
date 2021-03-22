import React, { useState } from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';
import LogInPage from '../../pages/Log-in-page';
import NotFoundPage from '../../pages/Not-found-page';
import { UserProvider } from '../../contexts/user-context';

function App() {
  const getSessionUser = JSON.parse(localStorage.getItem('sessionUser'));
  const [sessionUser, setSessionUser] = useState(getSessionUser);

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

export default App;
