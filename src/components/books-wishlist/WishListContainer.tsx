import React from "react";
import { WishListItem } from "./wish-list-item/WishListItem";
import { useAppSelector } from "../../redux/hooks";
import "./WishListContainer.scss"
import { selectWishList } from "../../redux/slices/wishList";

export const WishListContainer: React.FC = () => {
  const selectedBooks = useAppSelector(selectWishList);

  return (    
      <div className="wishlist--container">
        <h1 className="wish-list--title">Wishlist</h1>
        {selectedBooks &&
          selectedBooks.map((book) => (
            <WishListItem key={book.id} book={book} />
          ))}
      </div>
  );
};
