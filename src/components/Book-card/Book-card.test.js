/* eslint-disable one-var */
import React from 'react';
import { Link } from 'react-router-dom';
import { mount } from 'enzyme';

import BookCard from './Book-card';

// mock data
const match = { path: '/js-band-store' };
const book = {
  id: '0',
  price: 100,
  title: 'Book',
  author: 'Author',
  cover: 'cover.jpg',
};

// react-router-dom mock
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useParams: () => ({
  //   companyId: 'company-id1',
  //   teamId: 'team-id1',
  // }),
  Link: 'Link',
  useRouteMatch: () => ({ path: `/js-band-store` }),
}));

describe('Book Card', () => {
  const component = mount(<BookCard book={book} match={match} />);

  const bookCardTitle = component.find('.book-card__title').text();
  const bookCardAuthor = component.find('.book-card__author').text();
  const bookCardPrice = component.find('.book-card__price').text();
  const bookCardCover = component.find('.book-card__cover img').prop('src');
  const buttonClick = () => component.find('button').simulate('click');

  it('should render book title on Card', () => {
    expect(bookCardTitle).toBe(book.title);
  });

  it('should render book author on Card', () => {
    expect(bookCardAuthor).toBe(book.author);
  });

  it('should render book price on Card', () => {
    expect(bookCardPrice).toBe(`${book.price}$`);
  });

  it('should render book cover on Card', () => {
    expect(bookCardCover).toBe(book.cover);
  });

  it('should redirect clicking "View" button', () => {
    buttonClick();
    expect(component.find(Link).props().to).toBe(`/js-band-store/${book.id}`);
  });
});
