import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { booksSlice } from "./slices/main";
import { wishListSlice } from "./slices/wishList";

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    wishList: wishListSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
