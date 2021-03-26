/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import styles from './Order-form.module.scss';

function OrderForm({ id, price, count, addToCart }) {
  const [selectedBooks, setSelectedBooks] = useState('1');
  const [isCountEnabled, setIsCountEnabled] = useState(false);

  useEffect(() => {
    if (count === 0) return setIsCountEnabled(true);
    return setIsCountEnabled(false);
  }, [count]);

  const handleChange = (ev) => {
    const quantity = ev.target.value;

    if (quantity >= 1 && quantity <= count) setSelectedBooks(quantity);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    addToCart(id, selectedBooks);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['order-form']}>
      <div className={styles['order-form__price']}>
        <div>Price</div>
        <div className={styles['order-form__price-count']}>{price}</div>
      </div>

      <div className={styles['order-form__order']}>
        <div>Order</div>
        <input
          disabled={isCountEnabled}
          type="number"
          min="1"
          max={count}
          onChange={handleChange}
          defaultValue={selectedBooks}
          className={styles['order-form__order-count']}
        />
      </div>

      <div className={styles['order-form__total']}>
        <div>Total</div>
        <div className={styles['order-form__total-count']}>
          {(selectedBooks * price).toFixed(2)}$
        </div>
      </div>

      <div className={styles['order-form__button']}>
        <Button
          disabled={isCountEnabled}
          type="submit"
          description="Add to Cart"
        />
      </div>
    </form>
  );
}

OrderForm.propTypes = {
  id: PropTypes.string,
  addToCart: PropTypes.func,
  count: PropTypes.number,
  price: PropTypes.number,
};

export default OrderForm;
