/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Button from '../../components/Button';
import styles from './Cart-page.module.scss';

import { ReactComponent as Cart } from './icons/Cart.svg';
import {
  orderBooksSelector,
  orderDataSelector,
  orderLoadingSelector,
} from '../../redux/selectors';
import { makeOrder, addToCart } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import OrderForm from '../../components/Order-form/Order-form';

function CartPage({ order, makeOrder, addToCart, loading, orderedBooks }) {
  const { sessionUser } = useContext(userContext);
  console.log('orderedBooks', orderedBooks);
  console.log('order', order);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (order.length) makeOrder(sessionUser, order);
  };

  return (
    <div className={styles['cart-page']}>
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      <div className={styles['cart-page__header']}>
        <h1 className={styles['cart-page__title']}>Cart</h1>
        <div className={styles['cart-page__items-quantity']}>
          {order.length} items
        </div>
      </div>
      {order.length ? (
        <div className={styles['cart-page__body_full']}>
          <div className={styles['cart-page__form']}>
            <div className={styles['cart-page__form-header']}>
              <div className={styles['cart-page__form-header-name']}>Name</div>
              <div className={styles['cart-page__form-header-item']}>
                <div className={styles['cart-page__form-header-price']}>
                  Price
                </div>
                <div className={styles['cart-page__form-header-count']}>
                  Count
                </div>
                <div className={styles['cart-page__form-header-total']}>
                  Total
                </div>
              </div>
            </div>
            <div className={styles['cart-page__form-body']}>
              {orderedBooks.map((item) => {
                return (
                  <OrderForm
                    key={uuid()}
                    appPage="Cart"
                    item={item}
                    addToCart={addToCart}
                  />
                );
              })}
            </div>
            <div className={styles['cart-page__form-footer']}>Total price:</div>
          </div>
          <div className={styles['cart-page__button-container']}>
            <div className={styles['cart-page__submit-button']}>
              <Button type="submit" description="Purchase" onClick={onSubmit} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['cart-page__body_empty']}>
          <div className={styles['cart-page__body-empty-icon']}>
            <Cart />
          </div>
          <div className={styles['cart-page__body-empty-description']}>
            Cart empty...
          </div>
        </div>
      )}
    </div>
  );
}

CartPage.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  makeOrder: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(
  (state) => ({
    order: orderDataSelector(state),
    loading: orderLoadingSelector(state),
    orderedBooks: orderBooksSelector(state),
  }),
  { makeOrder, addToCart }
)(CartPage);
