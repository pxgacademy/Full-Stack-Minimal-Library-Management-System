export enum BookGenre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

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

export interface BookDocument extends CreateBookInputs, Document {
  updateAvailability: () => Promise<BookDocument>;
}
