import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Not-found-page.module.scss';

function NotFoundPage() {
  return (
    <div className={styles['not-found-page']}>
      <div className="page-title">
        <span>404</span> page not found
      </div>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
