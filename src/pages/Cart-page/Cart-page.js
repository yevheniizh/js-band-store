/* eslint-disable react/require-default-props */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './Cart-page.module.scss';
import Order from '../../components/Order';

import { ReactComponent as Cart } from './icons/Cart.svg';
import {
  orderDataSelector,
  orderLoadedSelector,
  orderLoadingSelector,
  orderMessageSelector,
} from '../../redux/selectors';
import { makeOrder, clearCart } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function CartPage({ order, loading, loaded, message, makeOrder, clearCart }) {
  const { sessionUser } = useContext(userContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [redirctTo, setRedirctTo] = useState(false);

  useEffect(() => {
    if (message) setIsShowModal(true);
  }, [message, loaded]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (order.length) makeOrder(sessionUser, order);
  };

  const onCloseModal = () => {
    clearCart(); // clear message from order store
    setIsShowModal(false);
  };

  const onAccept = () => {
    onCloseModal();
    setRedirctTo(true);
  };

  if (redirctTo) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-page__header']}>
        <h1 className={styles['cart-page__title']}>Cart</h1>
        <div className={styles['cart-page__items-quantity']}>
          {order.length} items
        </div>
      </div>

      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      {loaded && isShowModal && (
        <div className={styles.loading}>
          <Modal
            onCloseModal={onCloseModal}
            onAccept={onAccept}
            message={message}
            body={<Order modal />}
          />
        </div>
      )}

      {order.length > 0 && !message && (
        <div className={styles['cart-page__body_full']}>
          <Order />
          <div className={styles['cart-page__button-container']}>
            <div className={styles['cart-page__submit-button']}>
              <Button type="submit" description="Purchase" onClick={onSubmit} />
            </div>
          </div>
        </div>
      )}

      {!order.length && (
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
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  message: PropTypes.string,
  makeOrder: PropTypes.func,
  clearCart: PropTypes.func,
};

export default connect(
  (state) => ({
    order: orderDataSelector(state),
    loading: orderLoadingSelector(state),
    loaded: orderLoadedSelector(state),
    message: orderMessageSelector(state).message,
  }),
  { makeOrder, clearCart }
)(CartPage);
