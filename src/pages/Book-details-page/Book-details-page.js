/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderForm from '../../components/Order-form';
import styles from './Book-details-page.module.scss';

import { ReactComponent as Arrow } from './icons/Arrow-left.svg';
import { ReactComponent as Tag } from './icons/Tag.svg';
import { ReactComponent as Glasses } from './icons/Glasses.svg';
import { loadBook } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import {
  booksListSelector,
  booksLoadedSelector,
  booksLoadingSelector,
  failureDataSelector,
} from '../../redux/selectors';

function BookDetailsPage({
  books,
  match,
  loaded,
  loading,
  loadBook,
  failureData,
}) {
  const { sessionUser } = useContext(userContext);
  const [book, setBook] = useState({});
  const { bookId } = match.params;

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
          <Glasses className={styles['book-details-page__level-icon']} />
          {book.level}
        </div>
        <div className={styles['book-details-page__tags']}>
          <Tag className={styles['book-details-page__tags-icon']} />
          {book.tags}
        </div>
      </div>
      <div className={styles['book-details-page__form']}>
        <OrderForm id={book.id} price={book.price} count={book.count} />
      </div>
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
};

export default connect(
  (state) => ({
    books: booksListSelector(state),
    failureData: failureDataSelector(state),
    loading: booksLoadingSelector(state),
    loaded: booksLoadedSelector(state),
  }),
  { loadBook }
)(BookDetailsPage);
