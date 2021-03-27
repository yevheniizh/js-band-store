/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import styles from './Cart-page.module.scss';

import { ReactComponent as Cart } from './icons/Cart.svg';
import {
  orderDataSelector,
  orderLoadedSelector,
  orderLoadingSelector,
} from '../../redux/selectors';
import { makeOrder } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';

function CartPage({ order, makeOrder, loading, loaded }) {
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
          <form className={styles['cart-page__form']} onSubmit={onSubmit}>
            <div className={styles['cart-page__form-body']}>Form order</div>
            <div className={styles['cart-page__form-footer']}>
              <div className={styles['cart-page__button']}>
                <Button type="submit" description="Purchase" />
              </div>
            </div>
          </form>
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
  }),
  { makeOrder }
)(CartPage);
