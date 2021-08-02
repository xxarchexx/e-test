// import React from 'react';
// import "@testing-library/jest-dom/extend-expect";
// import { render } from '@testing-library/react';
// import {WishListItem} from './WishListItem';
// import {IBook} from '../../../redux/types/Book';

// test('renders content', () => {
//   const book = {
//     id: "1",
//     title: "this is a test",
//     authors : ["test"], 
//     description : "test", 
//     isSelected : false, 
//     published: "2000",
//     image: "#",
//     publisher: "qwerty",
//     publishedDate: Date.now().toLocaleString()
//   };

//   const { getByText } = render(<WishListItem book={book} />);

//   const titleElement = getByText(book.title);

//   expect(titleElement).toBeInTheDocument();
// });


const React = require("react")
const renderer = require("react-test-renderer")
// import renderer from 'r';
  const book = {
    id: "1",
    title: "this is a test",
    authors : ["test"], 
    description : "test", 
    isSelected : false, 
    published: "2000",
    image: "#",
    publisher: "qwerty",
    publishedDate: Date.now().toLocaleString()
  };

import {WishListItem} from './WishListItem';
import * as reactRedux from 'react-redux'

beforeEach(() => {
  useSelectorMock.mockClear()
  useDispatchMock.mockClear()
})

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<WishListItem book={book}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
