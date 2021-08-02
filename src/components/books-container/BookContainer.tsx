import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectBooks } from "../../redux/slices/main";
import { fetchBooks } from "../../redux/thunks/book.service";
import { throttle } from "../../utils/trottle";
import { BookCard } from "../book-card/BookCard";
import BookSearch from "../book-search/BookSearch";

const BookContainer: React.FC = () => {
  const books = useAppSelector(selectBooks);
  const dispatch = useAppDispatch();
  const onScroll = async () => {
    const screenHeight = window.innerHeight;
    const { pageYOffset } = window;
    const { scrollHeight } = document.body;

    if (pageYOffset + screenHeight + 10 > scrollHeight) {
      await dispatch(fetchBooks());
    }
  };

  const onScrollOptimize = throttle(onScroll, 500);

  useEffect(() => {
    window.addEventListener("scroll", onScrollOptimize);
    return () => {
      window.removeEventListener("scroll", onScrollOptimize);
    };
  }, []);

  return (
    <div className="container">
      <BookSearch />
      <div className="at-grid">
        {books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
};

export default BookContainer;
