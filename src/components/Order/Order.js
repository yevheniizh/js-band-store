// /* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import styles from './Order.module.scss';
import OrderItemForm from '../Order-item-form';
import { orderBooksSelector, totalSelector } from '../../redux/selectors';

function Order({ orderedBooks, total, modal }) {
  return (
    <div className={styles.order}>
      <div className={styles.order__header}>
        <div className={styles['order__header-name']}>Name</div>
        <div className={styles['order__header-item']}>
          <div className={styles['order__header-price']}>Price</div>
          <div className={styles['order__header-count']}>Count</div>
          <div className={styles['order__header-total']}>Total</div>
        </div>
      </div>
      <div className={styles.order__body}>
        {orderedBooks.map((item) => {
          return (
            <OrderItemForm
              modal={modal}
              key={uuid()}
              appPage="Cart"
              item={item}
            />
          );
        })}
      </div>
      <div className={styles.order__footer}>
        <div className={styles.order__total}>Total price:</div>
        <div className={styles['order__total-price']}>{total.toFixed(2)}$</div>
      </div>
    </div>
  );
}

Order.propTypes = {
  modal: PropTypes.bool,
  total: PropTypes.number,
  orderedBooks: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default connect((state) => ({
  orderedBooks: orderBooksSelector(state),
  total: totalSelector(state),
}))(Order);
