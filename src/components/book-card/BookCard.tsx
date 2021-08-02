import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsSelected, wishListSlice } from "../../redux/slices/wishList";
import { IBook } from "../../redux/types/Book";
import "./BookCard.scss";
interface IBookCardProps {
  book: IBook;
}

export const BookCard: React.FC<IBookCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const { id, authors, publishedDate, description, title, image } = props.book;

  const isSelected = useAppSelector(selectIsSelected(id));

  return (
    <div className="at-column">
      <div className={"card-row"}>
        <p>{title}</p>
        <button
          disabled={isSelected}
          onClick={() =>
            dispatch(wishListSlice.actions.addToWishList(props.book))
          }
        >
          {isSelected ? "Added" : "+"}
        </button>
      </div>
      <div className={"tt-container"}>
        <div className={"img-container"}>
          {image && <img src={image} alt={title} />}
        </div>
        <div className="truncate-text">{description}</div>
      </div>
      <p>{authors && authors.map((item) => item)}</p>
      <p>{publishedDate}</p>
    </div>
  );
};
