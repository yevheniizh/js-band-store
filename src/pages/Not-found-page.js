import React from 'react';

import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="error-404">
      <h1 className="page-title">404 page not found</h1>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
