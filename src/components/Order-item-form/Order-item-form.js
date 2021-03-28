/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Order-item-form.module.scss';
import OrderItem from './Order-item';

function OrderItemForm({ addToCart, appPage, item }) {
  const [selectedBooks, setSelectedBooks] = useState(item.count || 1);
  const [isBookDisabled, setIsBookDisabled] = useState(false);
  const { book } = item;

  useEffect(() => {
    if (item.count === 0) return setIsBookDisabled(true);
    return setIsBookDisabled(false);
  }, [item.count]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    addToCart(book.id, selectedBooks);
  };

  if (appPage === 'Cart') {
    return (
      <form onSubmit={handleSubmit} className={styles['order-form-cart']}>
        <div className={styles['order-form__title']}>
          <Link to={`/js-band-store/${book.id}`}>{book.title}</Link>
        </div>
        <OrderItem
          item={item}
          setSelectedBooks={setSelectedBooks}
          selectedBooks={selectedBooks}
          isBookDisabled
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles['order-form']}>
      <div className={styles['order-form__body']}>
        <div className={styles['order-form__descriptors']}>
          <div className={styles['order-form__price-descriptor']}>Price</div>
          <div className={styles['order-form__count-descriptor']}>Count</div>
          <div className={styles['order-form__total-descriptor']}>Total</div>
        </div>

        <OrderItem
          item={item}
          setSelectedBooks={setSelectedBooks}
          selectedBooks={selectedBooks}
          isBookDisabled
        />
      </div>
      <div className={styles['order-form__button']}>
        <Button
          disabled={isBookDisabled}
          type="submit"
          description="Add to Cart"
        />
      </div>
    </form>
  );
}

OrderItemForm.propTypes = {
  addToCart: PropTypes.func,
  appPage: PropTypes.string,
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

export default OrderItemForm;
