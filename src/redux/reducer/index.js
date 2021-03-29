import { combineReducers } from 'redux';

import login from './login';
import books from './books';
import order from './order';

export default combineReducers({
  login,
  books,
  order,
});
