import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import styles from './Order-form.module.scss';

function OrderForm({ price, count }) {
  const [selectedBooks, setSelectedBooks] = useState(1);

  const handleChange = (ev) => {
    const quantity = ev.target.value;

    if (quantity >= 1 && quantity <= count) setSelectedBooks(quantity);
  };

  const handleSubmit = () => {
    console.log('Submit');
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
        <Button type="submit" description="Add to Cart" />
      </div>
    </form>
  );
}

OrderForm.propTypes = {
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderForm;
