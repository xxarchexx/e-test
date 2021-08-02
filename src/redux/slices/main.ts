import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchBooks } from "../thunks/book.service";

import { IBook } from "../types/Book";

const booksAdapter = createEntityAdapter<IBook>({
  selectId: (a) => a.id,
});

export const booksSlice = createSlice({
  name: "books",

  initialState: booksAdapter.getInitialState({
    status: "fulfilled",
    searchText: "",
    startIndex: 0,
  }),
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.startIndex = 0;

      if (action.payload === "") {
        booksAdapter.removeAll(state);
      }
    },
    toggleIsSelectedBook: (state, action: PayloadAction<string>) => {
      const book = booksAdapter
        .getSelectors()
        .selectById(state, action.payload);

      booksAdapter.updateOne(state, {
        id: action.payload,
        changes: { isSelected: !book?.isSelected },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.startIndex = state.startIndex + 10;

        if (!action.payload.isPagination) {
          booksAdapter.removeAll(state);
          booksAdapter.setMany(state, action.payload.items);
        } else {
          booksAdapter.addMany(state, action.payload.items);
        }
      })

      .addCase(fetchBooks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

const { selectAll } = booksAdapter.getSelectors();

export const selectStartIndex = (state: RootState) => state.books.startIndex;
export const selectBooks = (state: RootState) => selectAll(state.books);
export const selectSearchText = (state: RootState) => state.books.searchText;
export const selectIsPending = (state: RootState) =>
  state.books.status === "pending";

export const selectSelectedBooks = createSelector(selectBooks, (books) =>
  books.filter((book) => book.isSelected)
);
