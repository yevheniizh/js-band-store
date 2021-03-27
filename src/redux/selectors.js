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
export const orderLoadingSelector = (state) => state.order.loading;
export const orderLoadedSelector = (state) => state.order.loaded;

// order data for fetching purchase
export const orderDataSelector = createSelector(orderSelector, (order) =>
  Object.entries(order).reduce((acc, [id, amount]) => {
    const subArr = [...Array(amount)].fill(id);
    return [...acc, ...subArr];
  }, [])
);

// full order info  selector:
// 1) filter cart with positive count of books
// 2) set full book info
// 3) create object with full book info, subtotal book count & price
export const orderBooksSelector = createSelector(
  booksSelector,
  orderSelector,
  (books, order) =>
    Object.keys(order)
      .filter((bookId) => order[bookId] > 0)
      .map((bookId) => books[bookId])
      .map((book) => ({
        book,
        count: order[book.id],
        subtotal: order[book.id] * book.price,
      }))
);

export const totalSelector = createSelector(orderBooksSelector, (orderBooks) =>
  orderBooks.reduce((acc, { subtotal }) => acc + subtotal, 0)
);
