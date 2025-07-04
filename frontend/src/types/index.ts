//

export interface UserInputs {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

//

export const bookGenres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

export type BookGenre = (typeof bookGenres)[number];

export interface CreateBookInputs {
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookResponse {
  _id: string;
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//

export interface BorrowBookInputs {
  user: string;
  book: string;
  quantity: number;
  dueDate: Date;
  isReturned: boolean;
}

export interface BorrowBookResponse {
  _id: string;
  user: string | UserResponse;
  book: string | BookResponse;
  quantity: number;
  dueDate: Date;
  isReturned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowSummaryT {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
