/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderForm from '../../components/Order-form';
import styles from './Book-details-page.module.scss';

import { ReactComponent as Arrow } from './icons/Arrow-left.svg';
import { ReactComponent as Tags } from './icons/Tags.svg';
import { ReactComponent as Eyeglasses } from './icons/Eyeglasses.svg';
import { loadBook, addToCart } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import {
  booksListSelector,
  booksLoadedSelector,
  booksLoadingSelector,
  failureDataSelector,
  orderBooksSelector,
} from '../../redux/selectors';

function BookDetailsPage({
  books,
  match,
  loaded,
  loading,
  loadBook,
  addToCart,
  failureData,
  orderedBooks,
}) {
  const { sessionUser } = useContext(userContext);
  const [book, setBook] = useState({});
  const { bookId } = match.params;
  console.log(orderedBooks);

  useEffect(() => {
    if (!loading && !loaded) loadBook(sessionUser, bookId);
  }, [loadBook, loading, loaded, sessionUser, bookId]);

  useEffect(() => {
    if (!loading && loaded) {
      const getBook = books.find(({ id }) => id === bookId);
      setBook(getBook);
    }
  }, [books, bookId, loading, loaded]);

  if (loading || !loaded) return <Loader />;

  if (failureData.message) {
    return (
      <div>
        <h1>Something went wrong: {failureData.message} 🙊</h1>
      </div>
    );
  }

  return (
    <div className={styles['book-details-page']}>
      <div className={styles['book-details-page__header']}>
        <Link to="/">
          <Arrow />
        </Link>
      </div>
      <div className={styles['book-details-page__cover']}>
        <img src={book.cover} alt="Book cover" />
      </div>
      <div className={styles['book-details-page__info']}>
        <div className={styles['book-details-page__title']}>
          <h1>{book.title}</h1>
        </div>
        <div className={styles['book-details-page__author']}>
          <h2>{book.author}</h2>
        </div>
        <div className={styles['book-details-page__description']}>
          {book.description}
        </div>
        <div className={styles['book-details-page__level']}>
          <Eyeglasses className={styles['book-details-page__level-icon']} />
          {book.level}
        </div>
        <div className={styles['book-details-page__tags']}>
          <Tags className={styles['book-details-page__tags-icon']} />
          {book.tags}
        </div>
      </div>

      {orderedBooks && orderedBooks.find(({ book }) => book.id === bookId) ? (
        <div className={styles['book-details-page__form']}>
          <OrderForm
            item={orderedBooks.find(({ book }) => book.id === bookId)}
            addToCart={addToCart}
          />
        </div>
      ) : (
        <div className={styles['book-details-page__form']}>
          <OrderForm item={{ book }} addToCart={addToCart} />
        </div>
      )}
    </div>
  );
}

BookDetailsPage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      level: PropTypes.string,
      description: PropTypes.string,
      cover: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),

  match: PropTypes.shape({
    params: PropTypes.shape({
      bookId: PropTypes.string,
    }),
  }).isRequired,
  failureData: PropTypes.shape({
    message: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  loadBook: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    books: booksListSelector(state),
    failureData: failureDataSelector(state),
    loading: booksLoadingSelector(state),
    loaded: booksLoadedSelector(state),
    orderedBooks: orderBooksSelector(state),
  }),
  { loadBook, addToCart }
)(BookDetailsPage);
