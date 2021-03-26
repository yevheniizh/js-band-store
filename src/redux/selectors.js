import { createSelector } from 'reselect';

export const loginSelector = (state) => state.login.entities;
export const loginLoadingSelector = (state) => state.login.loading;
export const loginLoadedSelector = (state) => state.login.loaded;

const booksSelector = (state) => state.books.entities;
export const booksListSelector = createSelector(booksSelector, Object.values);
export const failureDataSelector = (state) => state.books.entities;
export const booksLoadingSelector = (state) => state.books.loading;
export const booksLoadedSelector = (state) => state.books.loaded;

const orderSelector = (state) => state.order.entities;
export const orderDataSelector = createSelector(orderSelector, (order) =>
  Object.entries(order).map(([id, amount]) => ({ id, amount }))
);
