import React from 'react';
import { render } from '@testing-library/react';
import BookSearch from './BookSearch';

test('renders learn react link', () => {
  const { getByText } = render(<BookSearch />);
  const linkElement = getByText(/My Good Reads/i);
  expect(linkElement).toBeInTheDocument();
});
