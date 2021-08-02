import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { wishListSlice } from "../../../redux/slices/wishList";
import { IBook } from "../../../redux/types/Book";
import './Wishlist.scss'

interface IBookCardProps {
  book: IBook;
}

export const WishListItem: React.FC<IBookCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const { book } = props;
  return (
    <div className="wish-list-item">
      <div className="book-title">{book.title}</div>
      <div className="book-image">
        {book.image && <img src={book.image} alt={book.title} />}
      </div>
      <button
        onClick={() => {
          console.log(book.id);
          dispatch(wishListSlice.actions.removeFromWishList(book.id));
        }}
      >
        remove
      </button>
    </div>
  );
};
