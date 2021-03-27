/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Order-form.module.scss';

function OrderForm({ addToCart, appPage, item }) {
  const [selectedBooks, setSelectedBooks] = useState(item.count || 1);
  const [isCountDisabled, setIsCountDisabled] = useState(false);
  const { book } = item;

  useEffect(() => {
    if (item.count === 0) return setIsCountDisabled(true);
    return setIsCountDisabled(false);
  }, [item.count]);

  const handleChange = (ev) => {
    const quantity = parseInt(ev.target.value, 10);
    if (quantity >= 1 && quantity <= book.count) setSelectedBooks(quantity);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    addToCart(book.id, selectedBooks);
  };

  const formContainer = (
    <>
      <div className={styles['order-form__price']}>
        <div>Price</div>
        <div className={styles['order-form__price-count']}>{book.price}$</div>
      </div>

      <div className={styles['order-form__order']}>
        <div>Count</div>
        <input
          disabled={isCountDisabled}
          type="number"
          min={1}
          max={book.count}
          onChange={handleChange}
          defaultValue={selectedBooks}
          className={styles['order-form__order-count']}
        />
      </div>

      <div className={styles['order-form__total']}>
        <div>Total</div>
        <div className={styles['order-form__total-count']}>
          {(selectedBooks * book.price).toFixed(2)}$
        </div>
      </div>
    </>
  );

  if (appPage === 'Cart') {
    return (
      <form onSubmit={handleSubmit} className={styles['order-form']}>
        <div className={styles['order-form__title']}>
          <div>Name</div>
          <div className={styles['order-form__title-count']}>
            <Link to={`/js-band-store/${book.id}`}>{book.title}</Link>
          </div>
        </div>
        {formContainer}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles['order-form']}>
      {formContainer}
      <div className={styles['order-form__button']}>
        <Button
          disabled={isCountDisabled}
          type="submit"
          description="Add to Cart"
        />
      </div>
    </form>
  );
}

OrderForm.propTypes = {
  addToCart: PropTypes.func,
  appPage: PropTypes.string,
  item: PropTypes.shape({
    count: PropTypes.number,
    subtotal: PropTypes.string,
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

export default OrderForm;
