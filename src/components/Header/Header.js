/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { userContext } from '../../contexts/user-context';
import { logOut } from '../../redux/actions';

import Button from '../Button';
import { ReactComponent as Cart } from './icons/Cart.svg';
import { orderDataSelector } from '../../redux/selectors';

function Header({ logOut, order }) {
  const { sessionUser, setSessionUser } = useContext(userContext);

  const onClick = (ev) => {
    ev.preventDefault();

    logOut();
    localStorage.clear();
    setSessionUser(null);
  };

  return (
    <header className={styles.header}>
      <nav className={styles['header-js-band-store']}>
        <Link to="/">
          <h2>JS Band Store</h2>
        </Link>
      </nav>
      <nav className={styles['header-user']}>
        <div className={styles['header-user__info']}>
          <div className={styles['header-user__avatar']}>
            <img src={sessionUser.avatar} alt="Session user avatar" />
          </div>
          <div className={styles['header-user__welcome']}>
            Welcome, <b>{sessionUser.username}</b>
          </div>
          <div className={styles['header-user__sign-out']}>
            <Button onClick={onClick} type="button" description="Sign Out" />
          </div>
        </div>
        <div className={styles['header-user__cart']}>
          <Link to="/js-band-store/cart">
            <Cart /> ({order && order.length})
          </Link>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  order: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
  (state) => ({
    order: orderDataSelector(state),
  }),
  { logOut }
)(Header);
