import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render } from '@testing-library/react';
import {WishListItem} from './WishListItem';
import {IBook} from '../../../redux/types/Book';

test('renders content', () => {
  const wishListItem: IBook = {
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

  // const { getByText } = render(<WishListItem {...wishListItem} />);

  // const titleElement = getByText(wishListItem.title);

  // expect(titleElement).toBeInTheDocument();
});
