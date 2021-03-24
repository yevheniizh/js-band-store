/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadBooks } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';
import Loader from '../../components/Loader';

function StorePage({ loadBooks, loading, loaded, books }) {
  const { sessionUser } = useContext(userContext);
  useEffect(() => {
    if (!loading && !loaded) loadBooks(sessionUser);
  }, [loadBooks, loading, loaded, sessionUser]);

  if (loading || !loaded) return <Loader />;

  return <div>{books && books.map(() => <div>Book</div>)}</div>;
}

StorePage.propTypes = {
  books: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  loadBooks: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    books: state.books.entities,
    loading: state.books.loading,
    loaded: state.books.loaded,
  }),
  { loadBooks }
)(StorePage);
