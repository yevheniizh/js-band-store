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
  orderLoadedSelector,
  orderLoadingSelector,
} from '../../redux/selectors';
import { makeOrder, addToCart } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import OrderForm from '../../components/Order-form/Order-form';

function CartPage({
  order,
  makeOrder,
  addToCart,
  loading,
  loaded,
  orderedBooks,
}) {
  const { sessionUser } = useContext(userContext);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (order.length) makeOrder(sessionUser, order);
  };

  if (loading && !loaded) return <Loader />;

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-page__header']}>
        <h1 className={styles['cart-page__title']}>Cart</h1>
        <div className={styles['cart-page__items-quantity']}>
          {order.length} items
        </div>
      </div>
      {order.length ? (
        <div className={styles['cart-page__body_full']}>
          <div className={styles['cart-page__form']}>
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
            <div className={styles['cart-page__form-footer']}>
              <div className={styles['cart-page__button']}>
                <Button
                  type="submit"
                  description="Purchase"
                  onClick={onSubmit}
                />
              </div>
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
  loaded: PropTypes.bool,
};

export default connect(
  (state) => ({
    order: orderDataSelector(state),
    loading: orderLoadingSelector(state),
    loaded: orderLoadedSelector(state),
    orderedBooks: orderBooksSelector(state),
  }),
  { makeOrder, addToCart }
)(CartPage);
