/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { loadBooks } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';
import Loader from '../../components/Loader';

function StorePage({ loadBooks, loading, loaded, books, failureData }) {
  const { sessionUser } = useContext(userContext);
  useEffect(() => {
    if (!loading && !loaded) loadBooks(sessionUser);
  }, [loadBooks, loading, loaded, sessionUser]);

  if (loading || !loaded) return <Loader />;

  if (loaded && books)
    return (
      <div>
        {books.map(() => (
          <div key={uuid()}>Book</div>
        ))}
      </div>
    );

  if (failureData) console.log(failureData.message);

  return <div>Books</div>;
}

StorePage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      level: PropTypes.string,
      description: PropTypes.string,
      cover: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  failureData: PropTypes.shape({
    message: PropTypes.string,
  }),
  loadBooks: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    books: state.books.entities.books,
    failureData: state.books.entities,
    loading: state.books.loading,
    loaded: state.books.loaded,
  }),
  { loadBooks }
)(StorePage);
