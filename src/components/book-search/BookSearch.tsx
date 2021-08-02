import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { booksSlice, selectSearchText } from "../../redux/slices/main";
import { fetchBooks } from "../../redux/thunks/book.service";
import "./BookSearch.scss";

const BookSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const timer = useRef<any>(null);

  const searchText = useAppSelector(selectSearchText);

  const onChange = (e?: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(function () {
      dispatch(fetchBooks());
    }, 1000);
  };

  return (
    <div className="book--container">
      <div className="search-params">
        <input
          className="full-width"
          autoFocus
          name="gsearch"
          type="search"
          value={searchText}
          placeholder="Search for books to add to your reading list and press Enter"
          onChange={(e) => {
            dispatch(booksSlice.actions.setSearchText(e.target.value));
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default BookSearch;
