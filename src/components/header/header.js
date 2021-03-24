/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { userContext } from '../../contexts/user-context';

import Button from '../Button';
import { ReactComponent as Cart } from './icons/cart.svg';

function Header() {
  const { sessionUser } = useContext(userContext);

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
            <Button type="button" description="Sign Out" />
          </div>
        </div>
        <div className={styles['header-user__cart']}>
          <Cart /> (0)
        </div>
      </nav>
    </header>
  );
}

export default Header;
