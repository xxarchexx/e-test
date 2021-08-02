import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IBook } from "../types/Book";

const booksAdapter = createEntityAdapter<IBook>({
  selectId: (a) => a.id,
});

export const wishListSlice = createSlice({
  name: "wishList",
  initialState: booksAdapter.getInitialState({}),
  reducers: {
    removeFromWishList: (state, action: PayloadAction<string>) => {
      booksAdapter.removeOne(state, action.payload);
    },
    addToWishList: (state, action: PayloadAction<IBook>) => {
      booksAdapter.addOne(state, action.payload);
    },
  },
});

const { selectAll, selectById } = booksAdapter.getSelectors();

export const selectWishList = (state: RootState) => selectAll(state.wishList);
export const selectIsSelected = (id: string) => (state: RootState) =>
  !!selectById(state.wishList, id);
