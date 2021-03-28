/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order-item.module.scss';

function OrderItem({ item, selectedBooks, setSelectedBooks, isBookDisabled }) {
  const { book } = item;

  const handleChange = (ev) => {
    const quantity = parseInt(ev.target.value, 10);
    if (quantity >= 1 && quantity <= book.count) setSelectedBooks(quantity);
  };

  return (
    <div className={styles['order-form__container']}>
      <div className={styles['order-form__price']}>{book.price}$</div>
      <div className={styles['order-form__count']}>
        <input
          disabled={isBookDisabled}
          type="number"
          min={1}
          max={book.count}
          onChange={handleChange}
          defaultValue={selectedBooks}
          className={styles['order-form__count-input']}
        />
      </div>
      <div className={styles['order-form__total']}>
        {(selectedBooks * book.price).toFixed(2)}$
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    count: PropTypes.number,
    subtotal: PropTypes.number,
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
    }),
  }),
};

export default OrderItem;
