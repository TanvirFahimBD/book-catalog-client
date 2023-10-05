export interface IBook {
  _id: number;
  title: string;
  author: string[];
  genre: string;
  publicationYear: number;
  publisher: {
    name: string;
    location: string;
  };
  reviews: {
    user: string;
    comment: string;
  }[];
  rating: number;
  price: number;
  image: string;
}
