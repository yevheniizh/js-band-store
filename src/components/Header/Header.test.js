import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Header from './Header';
import { UserProvider } from '../../contexts/user-context';

// react-router-dom mock
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: 'Link',
}));

// redux store mock
const mockStore = configureStore([]);
const store = mockStore({
  order: { entities: { id: 1 } },
});
const dispatchMock = () => Promise.resolve({});
store.dispatch = jest.fn(dispatchMock);

describe('Testing Header', () => {
  const sessionUser = { username: 'Giorgio' };

  const component = mount(
    <UserProvider value={{ sessionUser }}>
      <Provider store={store}>
        <Header />
      </Provider>
    </UserProvider>
  );

  const headerWelcome = component.find('.header-user__welcome').text();

  it('should welcome User', () => {
    expect(headerWelcome).toBe(`Welcome, Giorgio`);
  });
});
