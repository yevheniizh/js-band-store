import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderForm from '../../components/Order-form';
import styles from './Book-details-page.module.scss';

import { ReactComponent as Arrow } from './icons/Arrow-left.svg';
import { ReactComponent as Tag } from './icons/Tag.svg';
import { ReactComponent as Glasses } from './icons/Glasses.svg';

function BookDetailsPage({ books, match }) {
  const { bookId } = match.params;
  const book = books.find(({ id }) => id === bookId);
  const { count, price, title, author, level, description, cover, tags } = book;

  return (
    <div className={styles['book-details-page']}>
      <div className={styles['book-details-page__header']}>
        <Link to="/">
          <Arrow />
        </Link>
      </div>
      <div className={styles['book-details-page__cover']}>
        <img src={cover} alt="Book cover" />
      </div>
      <div className={styles['book-details-page__info']}>
        <div className={styles['book-details-page__title']}>
          <h1>{title}</h1>
        </div>
        <div className={styles['book-details-page__author']}>
          <h2>{author}</h2>
        </div>
        <div className={styles['book-details-page__description']}>
          {description}
        </div>
        <div className={styles['book-details-page__level']}>
          <Glasses className={styles['book-details-page__level-icon']} />
          {level}
        </div>
        <div className={styles['book-details-page__tags']}>
          <Tag className={styles['book-details-page__tags-icon']} />
          {tags}
        </div>
      </div>
      <div className={styles['book-details-page__form']}>
        <OrderForm price={price} count={count} />
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
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      bookId: PropTypes.string,
    }),
  }).isRequired,
};

export default connect((state) => ({
  books: state.books.entities.books,
  loading: state.books.loading,
  loaded: state.books.loaded,
}))(BookDetailsPage);
