import fetchUrl from "../../shared/fetchUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBook } from "../types/Book";
import { clearBookResponse } from "../preprocessors/clearBooksResult";
import { RootState } from "../store";

type FetchBooksReturnType = {
  items: IBook[];
  isPagination: boolean;
};

type FetchBooksRejectType = { rejectValue: string };

export const fetchBooks = createAsyncThunk<
  FetchBooksReturnType,
  undefined,
  FetchBooksRejectType
>(
  "getbooks",
  async (args, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { startIndex, searchText } = state.books;

    try {
      const response = await fetchUrl(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}&filter=partial&startIndex=${startIndex}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.items) {
        return {
          items: clearBookResponse(response.items),
          isPagination: startIndex > 0,
        };
      }

      return rejectWithValue("books not found");
    } catch (e) {
      return rejectWithValue(JSON.stringify(e));
    }
  },
  {
    condition: (stub, { getState }: any) => {
      const { books } = getState() as RootState;

      if (books.status === "pending" || books.searchText === "") {
        return false;
      }
    },
  }
);
