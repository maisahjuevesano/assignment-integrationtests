import { IMovie } from "../../models/Movie";

export const mockData: IMovie[] = [
  {
    Title: "Star Wars IV",
    imdbID: "31841",
    Type: "text",
    Poster: "poster",
    Year: "1977",
  },
  {
    Title: "The Lord of the Rings",
    imdbID: "94752",
    Type: "text",
    Poster: "poster",
    Year: "2001",
  },
  {
    Title: "Harry Potter III",
    imdbID: "18463",
    Type: "text",
    Poster: "poster",
    Year: "2001",
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText !== "") {
      if (searchText.length > 3) {
        resolve(mockData);
      } else {
        resolve([]);
      }
    } else {
      reject();
    }
  });
};
