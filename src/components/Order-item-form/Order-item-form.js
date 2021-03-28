/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Order-item-form.module.scss';
import OrderItem from './Order-item';

function OrderItemForm({ addToCart, appPage, item, modal }) {
  const [selectedBooks, setSelectedBooks] = useState(item.count || 0);
  const [isBookDisabled, setIsBookDisabled] = useState(false);
  const { book } = item;

  useEffect(() => {
    if (book.count === 0) return setIsBookDisabled(true);

    return setIsBookDisabled(false);
  }, [book]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    addToCart(book.id, selectedBooks);
  };

  if (appPage === 'Cart') {
    return (
      <form onSubmit={handleSubmit} className={styles['order-item-form-cart']}>
        <div className={styles['order-item-form__title']}>
          <Link to={`/js-band-store/${book.id}`}>{book.title}</Link>
        </div>
        <div className={styles['order-item-form__container']}>
          <OrderItem
            modal={modal}
            item={item}
            setSelectedBooks={setSelectedBooks}
            selectedBooks={selectedBooks}
            isBookDisabled={isBookDisabled}
          />
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles['order-item-form']}>
      <div className={styles['order-item-form__body']}>
        <div className={styles['order-item-form__descriptors']}>
          <div className={styles['order-item-form__price-descriptor']}>
            Price
          </div>
          <div className={styles['order-item-form__count-descriptor']}>
            Count
          </div>
          <div className={styles['order-item-form__total-descriptor']}>
            Total
          </div>
        </div>
        <div
          className={
            (styles['order-item-form__container'],
            styles['order-item-form__container_column'])
          }
        >
          <OrderItem
            item={item}
            setSelectedBooks={setSelectedBooks}
            selectedBooks={selectedBooks}
            isBookDisabled={isBookDisabled}
          />
        </div>
      </div>

      <div className={styles['order-item-form__button']}>
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
  modal: PropTypes.bool,
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
