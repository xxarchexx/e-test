import { IBook, IBookIncome } from "../types/Book";

export const clearBookResponse = (booksResult: IBookIncome[]): IBook[] => {
  return booksResult.map((item) => {
    return {
      id: item.id,
      description: item.volumeInfo.description,
      isSelected: false,
      published: item.volumeInfo.published,
      title: item.volumeInfo.title,
      image: item.volumeInfo.imageLinks.thumbnail,
      authors: item.volumeInfo.authors || [],
      publishedDate: item.volumeInfo.publishedDate,
      publisher: item.volumeInfo.publisher,
    };
  });
};
