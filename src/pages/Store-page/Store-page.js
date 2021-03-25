/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { loadBooks } from '../../redux/actions';
import { userContext } from '../../contexts/user-context';
import Loader from '../../components/Loader';
import BookCard from '../../components/Book-card';
import styles from './Store-page.module.scss';

function StorePage({ loadBooks, loading, loaded, books, failureData }) {
  const { sessionUser } = useContext(userContext);
  const [modifiedBooks, setModifiedBooks] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!loading && !loaded) loadBooks(sessionUser);
  }, [loadBooks, loading, loaded, sessionUser]);

  // set initial list of modified books
  useEffect(() => {
    if (!loading && loaded) setModifiedBooks(books);
  }, [books, loading, loaded]);

  // set searched books
  useEffect(() => {
    if (books) {
      const results = books.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [books, searchTerm]);

  // filter searched books
  const filterBooks = useCallback(
    (value) => {
      let filteredBooks;

      switch (value) {
        case '0-25':
          filteredBooks = searchResults.filter(({ price }) => price <= 25);
          break;
        case '25-50':
          filteredBooks = searchResults.filter(
            ({ price }) => price <= 50 && price >= 25
          );
          break;
        case '50+':
          filteredBooks = searchResults.filter(({ price }) => price >= 50);
          break;
        case 'All prices':
          filteredBooks = searchResults;
          break;
        default:
          filteredBooks = searchResults;
          break;
      }

      setModifiedBooks(filteredBooks); // return modified books list
    },
    [searchResults]
  );

  // call filter books every time filterTerm changes
  useEffect(() => {
    filterBooks(filterTerm);
  }, [filterBooks, filterTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterTerm(event.target.value);
    filterBooks(event.target.value);
  };

  if (loading || !loaded) return <Loader />;

  if (loaded && books && modifiedBooks) {
    return (
      <>
        <div className={styles['store-page-navigation']}>
          <div className={styles['store-page-navigation-container']}>
            <input
              type="text"
              placeholder="&#128269; Search for book"
              value={searchTerm}
              onChange={handleSearch}
            />

            <select name="filter" id="filter-select" onChange={handleFilter}>
              <option value="All prices" defaultValue>
                All prices
              </option>
              <option value="0-25">0 &#60; price &#60; 25$</option>
              <option value="25-50">25$ &#60; price &#60; 50$</option>
              <option value="50+">price &#62; 50$</option>
            </select>
          </div>
        </div>
        <div className={styles['store-page-container']}>
          {modifiedBooks.map((book) => (
            <BookCard key={uuid()} book={book} />
          ))}
        </div>
      </>
    );
  }

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