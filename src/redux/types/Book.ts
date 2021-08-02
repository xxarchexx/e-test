export interface IBookIncome {
  id: string;
  volumeInfo: {
    imageLinks: { thumbnail?: string; smallThumbnail?: string };
    title: string;
    authors?: string[];
    description: string;
    publisher: string;
    published: string;
    publishedDate: string;
  };
}

export interface IBook {
  id: string;
  isSelected: boolean;
  authors: string[];
  description: string;
  publisher: string;
  published: string;
  publishedDate: string;
  title: string;
  image?: string;
}
