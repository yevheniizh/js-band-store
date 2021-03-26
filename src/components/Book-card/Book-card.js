import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Book-card.module.scss';
import Button from '../Button';

function BookCard({ book }) {
  const { id, price, title, author, cover } = book;

  const match = useRouteMatch();

  return (
    <div data-id={id} className={styles['book-card']}>
      <div className={styles['book-card__cover']}>
        <img src={cover} alt="Book cover" />
      </div>
      <div className={styles['book-card__title']}>
        <h3>{title}</h3>
      </div>
      <div className={styles['book-card__author']}>
        <h4>{author}</h4>
      </div>
      <div className={styles['book-card__footer']}>
        <div className={styles['book-card__price']}>{price}$</div>
        <Link to={`${match.path}/${id}`}>
          <Button description="View" />
        </Link>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    level: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BookCard;
