import React, { useState } from "react";
import "./App.scss";
import "./books-wishlist/wish-list-item/Wishlist.scss";
import { WishListContainer } from "./books-wishlist/WishListContainer";
import BookContainer from "./books-container/BookContainer";

function App() {
  const [isWishList, setIsWishList] = useState(false);

  return (
    <div>
      <header className="header">
        <div className={"header--content"}>
          <h1>My Good Reads</h1>
          <div className="header-wishlist-btn">
            <div className="mobile-menu" onClick={() => setIsWishList(prev => !prev)}>
              <span className="bar line1"></span>
              <span className="bar line2"></span>
              <span className="bar line3"></span>
            </div>
          </div>
        </div>
      </header>
      <div className="row desktop">
        <BookContainer />
        <WishListContainer />
      </div>
      <div className="mobile">
        {isWishList ? <WishListContainer /> : <BookContainer />}
      </div>
    </div>
  );
}

export default App;
