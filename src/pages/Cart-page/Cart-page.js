/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Button from '../../components/Button';
import styles from './Cart-page.module.scss';

import { ReactComponent as Cart } from './icons/Cart.svg';
import {
  orderBooksSelector,
  orderDataSelector,
  orderLoadedSelector,
  orderLoadingSelector,
  orderMessageSelector,
  totalSelector,
} from '../../redux/selectors';
import { makeOrder, addToCart, clearCart } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';

import Loader from '../../components/Loader';
import OrderForm from '../../components/Order-form/Order-form';
import Modal from '../../components/Modal';

function CartPage({
  order,
  makeOrder,
  addToCart,
  loading,
  loaded,
  orderedBooks,
  total,
  message,
  clearCart,
}) {
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
    setRedirctTo(true);
  };

  if (redirctTo) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles['cart-page']}>
      {loading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      {loaded && isShowModal && (
        <div className={styles.loading}>
          <Modal onCloseModal={onCloseModal} message={message} />
        </div>
      )}
      <div className={styles['cart-page__header']}>
        <h1 className={styles['cart-page__title']}>Cart</h1>
        <div className={styles['cart-page__items-quantity']}>
          {order.length} items
        </div>
      </div>

      {order.length && !message ? (
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
            <div className={styles['cart-page__form-footer']}>
              <div className={styles['cart-page__total']}>Total price:</div>
              <div className={styles['cart-page__total-price']}>
                {total.toFixed(2)}$
              </div>
            </div>
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
  loaded: PropTypes.bool,
  total: PropTypes.number,
};

export default connect(
  (state) => ({
    order: orderDataSelector(state),
    message: orderMessageSelector(state).message,
    loading: orderLoadingSelector(state),
    loaded: orderLoadedSelector(state),
    orderedBooks: orderBooksSelector(state),
    total: totalSelector(state),
  }),
  { makeOrder, addToCart, clearCart }
)(CartPage);
