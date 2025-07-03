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
